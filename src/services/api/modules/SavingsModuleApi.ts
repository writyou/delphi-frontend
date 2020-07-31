import { autobind } from 'core-decorators';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as R from 'ramda';
import BN from 'bn.js';

import { getCurrentValueOrThrow } from 'utils/rxjs';
import { DepositToSavingsPool, IToBN } from 'model/types';
import { ETH_NETWORK_CONFIG, LONG_POOLING_TIMEOUT } from 'env';
import {
  createSavingsModule,
  createDefiProtocol,
  createSavingsPoolToken,
} from 'generated/contracts';
import { TokenAmount, LiquidityAmount, Currency } from 'model/entities';
import { memoize } from 'utils/decorators';

import { Erc20Api } from './Erc20Api';
import { Contracts, Web3ManagerModule } from '../types';
import { SubgraphApi } from './SubgraphApi';
import { TransactionsApi } from './TransactionsApi';

export class SavingsModuleApi {
  private readonlyContract: Contracts['savingsModule'];
  private txContract = new BehaviorSubject<null | Contracts['savingsModule']>(null);

  constructor(
    private web3Manager: Web3ManagerModule,
    private transactionsApi: TransactionsApi,
    private erc20: Erc20Api,
    private subgraph: SubgraphApi,
  ) {
    this.readonlyContract = createSavingsModule(
      this.web3Manager.web3,
      ETH_NETWORK_CONFIG.contracts.savingsModule,
    );

    this.web3Manager.txWeb3$
      .pipe(
        map(
          txWeb3 =>
            txWeb3 && createSavingsModule(txWeb3, ETH_NETWORK_CONFIG.contracts.savingsModule),
        ),
      )
      .subscribe(this.txContract);
  }

  public getPools$() {
    return this.subgraph.loadSavingsPools$();
  }

  public getPool$(address: string) {
    return this.subgraph.loadSavingsPool$(address);
  }

  @memoize((...args: string[]) => args.join())
  public getUserBalance$(poolAddress: string, account: string): Observable<LiquidityAmount> {
    return toLiquidityAmount$(
      this.subgraph.loadSavingsPool$(poolAddress).pipe(
        switchMap(pool => {
          if (!pool) {
            return of(new BN(0));
          }

          const poolTokenContract = this.getPoolTokenReadonlyContract(pool.poolToken.address);
          return poolTokenContract.methods.fullBalanceOf({ account }, [
            poolTokenContract.events.Transfer({ filter: { from: account } }),
            poolTokenContract.events.Transfer({ filter: { to: account } }),
            poolTokenContract.events.DistributionCreated(),
          ]);
        }),
      ),
    );
  }

  @memoize((...args: string[]) => args.join())
  public getPoolBalance$(poolAddress: string): Observable<LiquidityAmount> {
    return toLiquidityAmount$(
      this.subgraph
        .loadSavingsPool$(poolAddress)
        .pipe(
          switchMap(pool =>
            pool
              ? timer(0, LONG_POOLING_TIMEOUT).pipe(
                  switchMap(() =>
                    this.getProtocolReadonlyContract(
                      pool.address,
                    ).methods.normalizedBalance.read(undefined, [
                      this.readonlyContract.events.Deposit({ filter: { protocol: poolAddress } }),
                      this.readonlyContract.events.Withdraw({ filter: { protocol: poolAddress } }),
                    ]),
                  ),
                )
              : of(new BN(0)),
          ),
        ),
    );
  }

  @autobind
  public async deposit(deposits: DepositToSavingsPool[]): Promise<void> {
    const txContract = getCurrentValueOrThrow(this.txContract);
    const from = getCurrentValueOrThrow(this.web3Manager.account$);

    await this.erc20.approveMultiple(
      from,
      ETH_NETWORK_CONFIG.contracts.savingsModule,
      sumAmountsByToken(R.pluck('amount', deposits)),
    );

    const promiEvent = txContract.methods.deposit(
      {
        _protocols: deposits.map(x => x.poolAddress),
        _tokens: deposits.map(x => x.amount.currency.address),
        _dnAmounts: deposits.map(x => x.amount.toBN()),
      },
      { from },
    );

    this.transactionsApi.pushToSubmittedTransactions('savings.deposit', promiEvent, {
      deposits,
      fromAddress: from,
    });

    await promiEvent;
  }

  private getProtocolReadonlyContract(address: string): Contracts['defiProtocol'] {
    return createDefiProtocol(this.web3Manager.web3, address);
  }

  private getPoolTokenReadonlyContract(address: string): Contracts['savingsPoolToken'] {
    return createSavingsPoolToken(this.web3Manager.web3, address);
  }
}

function sumAmountsByToken(amounts: TokenAmount[]): TokenAmount[] {
  const reducedAmounts = amounts.reduce((acc, cur) => {
    const prev = acc.get(cur.currency.address)?.toFraction() || 0;
    acc.set(cur.currency.address, cur.add(prev));
    return acc;
  }, new Map<string, TokenAmount>());

  return Array.from(reducedAmounts.values());
}

const defaultLiquidityCurrency = new Currency('$', 18);

function toLiquidityAmount$(amount$: Observable<BN | IToBN>): Observable<LiquidityAmount>;
function toLiquidityAmount$(amount$: Observable<Array<BN | IToBN>>): Observable<LiquidityAmount[]>;
function toLiquidityAmount$(
  amount$: Observable<BN | IToBN | Array<BN | IToBN>>,
): Observable<LiquidityAmount | LiquidityAmount[]> {
  return amount$.pipe(
    map(amounts =>
      Array.isArray(amounts)
        ? amounts.map(amount => new LiquidityAmount(amount, defaultLiquidityCurrency))
        : new LiquidityAmount(amounts, defaultLiquidityCurrency),
    ),
  );
}
