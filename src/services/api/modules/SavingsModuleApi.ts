import { autobind } from 'core-decorators';
import moment from 'moment';
import { BehaviorSubject, Observable, of, timer, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as R from 'ramda';
import BN from 'bn.js';
import {
  IToBN,
  TokenAmount,
  LiquidityAmount,
  denormolizeAmount,
  sumTokenAmountsByToken,
  isEqualHex,
} from '@akropolis-web/primitives';

import { getSignificantValue } from 'utils';
import { getCurrentValueOrThrow, awaitFirstNonNullableOrThrow } from 'utils/rxjs';
import {
  DepositToSavingsPool,
  WithdrawFromSavingsPool,
  DepositToSavingsPoolWithFee,
} from 'model/types';
import { ETH_NETWORK_CONFIG, WEB3_LONG_POOLING_TIMEOUT, REWARDS_LONG_POOLING_TIMEOUT } from 'env';
import {
  createSavingsModule,
  createDefiProtocol,
  createSavingsPoolToken,
} from 'generated/contracts';
import { memoize } from 'utils/decorators';
import { DEFAULT_LIQUIDITY_CURRENCY, ALL_TOKEN } from 'utils/mock';
import { fromWeb3DataEvent } from 'generated/contracts/utils/fromWeb3DataEvent';

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
  public getUserRewards$(userAddress: string) {
    return combineLatest([
      this.readonlyContract.methods.supportedRewardTokens(),
      this.readonlyContract.methods.withdrawReward.read(
        undefined,
        {
          from: userAddress,
        },
        [this.readonlyContract.events.RewardWithdraw({ filter: { user: userAddress } })],
      ),
    ]).pipe(
      switchMap(([tokensAddresses, rewards]) =>
        combineLatest(tokensAddresses.map(tokenAddress => this.erc20.getToken$(tokenAddress))).pipe(
          map(tokens => tokens.map((token, index) => new TokenAmount(rewards[index], token))),
        ),
      ),
    );
  }

  @autobind
  public async withdrawUserRewards(): Promise<void> {
    const txContract = getCurrentValueOrThrow(this.txContract);
    const from = await awaitFirstNonNullableOrThrow(this.web3Manager.account$);

    const promiEvent = txContract.methods.withdrawReward(undefined, { from });

    this.transactionsApi.pushToSubmittedTransactions('rewards.withdraw', promiEvent, {
      fromAddress: from,
    });

    await promiEvent;
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
      timer(0, WEB3_LONG_POOLING_TIMEOUT).pipe(
        switchMap(() =>
          this.getProtocolReadonlyContract(poolAddress).methods.normalizedBalance.read(
            undefined,
            { from: poolAddress },
            [
              this.readonlyContract.events.Deposit({ filter: { protocol: poolAddress } }),
              this.readonlyContract.events.Withdraw({ filter: { protocol: poolAddress } }),
            ],
          ),
        ),
      ),
    );
  }

  @memoize(R.identity)
  public getPoolBalances$(poolAddress: string): Observable<TokenAmount[]> {
    const contract = this.getProtocolReadonlyContract(poolAddress);
    return combineLatest([
      this.getPool$(poolAddress),
      contract.methods.supportedTokens(),
      timer(0, WEB3_LONG_POOLING_TIMEOUT).pipe(
        switchMap(() => contract.methods.balanceOfAll.read(undefined, { from: poolAddress })),
      ),
    ]).pipe(
      map(([pool, tokens, balances]) => {
        return tokens.map((tokenAddress, index) => {
          const token = pool?.tokens.find(x => isEqualHex(x.address, tokenAddress));
          if (!token) throw new Error('Token not found');

          return new TokenAmount(balances[index], token);
        });
      }),
    ) as any;
  }

  @memoize((from: string, poolAddress: string, amount: TokenAmount) =>
    [from, poolAddress, amount.toString(), amount.currency.address].join(),
  )
  public getWithdrawFee$(
    from: string,
    poolAddress: string,
    amount: TokenAmount,
  ): Observable<TokenAmount> {
    return this.readonlyContract.methods.withdraw
      .read(
        {
          _protocol: poolAddress,
          token: amount.currency.address,
          dnAmount: amount.toBN(),
          maxNAmount: new BN(0),
        },
        {
          from,
        },
      )
      .pipe(
        map(nAmount => denormolizeAmount(new TokenAmount(nAmount, ALL_TOKEN), amount.currency)),
        map(dnAmount => dnAmount.sub(amount)),
      );
  }

  @memoize(R.identity)
  public getRewards$(poolAddress: string): Observable<TokenAmount[]> {
    return timer(0, REWARDS_LONG_POOLING_TIMEOUT).pipe(
      switchMap(() => {
        const rewardsPerPeriod = new BN(moment().subtract(7, 'days').unix()).toString();
        return this.subgraph.loadRewards$(poolAddress, rewardsPerPeriod);
      }),
      map(rewards => sumTokenAmountsByToken(R.pluck('amount', rewards))),
    );
  }

  @autobind
  public async deposit(deposits: DepositToSavingsPool[]): Promise<void> {
    const txContract = getCurrentValueOrThrow(this.txContract);
    const from = await awaitFirstNonNullableOrThrow(this.web3Manager.account$);

    await this.erc20.approveMultiple(
      from,
      ETH_NETWORK_CONFIG.contracts.savingsModule,
      sumTokenAmountsByToken(R.pluck('amount', deposits)),
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

  @autobind
  public async withdrawAll(withdraw: WithdrawFromSavingsPool): Promise<void> {
    const txContract = getCurrentValueOrThrow(this.txContract);
    const from = await awaitFirstNonNullableOrThrow(this.web3Manager.account$);

    const promiEvent = txContract.methods.withdrawAll(
      {
        _protocol: withdraw.poolAddress,
        nAmount: withdraw.amount.toBN(),
      },
      { from },
    );

    this.transactionsApi.pushToSubmittedTransactions('savings.withdrawAll', promiEvent, {
      withdraw,
      fromAddress: from,
    });

    await promiEvent;
  }

  @autobind
  public async withdraw(withdraw: WithdrawFromSavingsPool): Promise<void> {
    const txContract = getCurrentValueOrThrow(this.txContract);
    const from = await awaitFirstNonNullableOrThrow(this.web3Manager.account$);

    const promiEvent = txContract.methods.withdraw(
      {
        _protocol: withdraw.poolAddress,
        token: withdraw.amount.currency.address,
        dnAmount: withdraw.amount.toBN(),
        maxNAmount: new BN(0),
      },
      { from },
    );

    this.transactionsApi.pushToSubmittedTransactions('savings.withdraw', promiEvent, {
      withdraw,
      fromAddress: from,
    });

    await promiEvent;
  }

  @memoize((...args: string[]) => args.join())
  public getDepositLimit$(
    userAddress: string,
    poolAddress: string,
  ): Observable<LiquidityAmount | null> {
    return combineLatest([
      toLiquidityAmount$(
        this.readonlyContract.methods.userCap(
          {
            _protocol: poolAddress,
            user: userAddress,
          },
          [
            this.readonlyContract.events.UserCapChanged({
              filter: { user: userAddress, protocol: poolAddress },
            }),
          ],
        ),
      ),
      this.getDepositLimitsEnabled$(),
    ]).pipe(
      map(([limit, enabled]) => {
        const roundedLimit = limit.toBN().gt(getSignificantValue(limit.currency.decimals))
          ? limit
          : limit.withValue(0);
        return enabled ? roundedLimit : null;
      }),
    );
  }

  @memoize()
  private getDepositLimitsEnabled$(): Observable<boolean> {
    return this.readonlyContract.methods.userCapEnabled(undefined, [
      this.readonlyContract.events.UserCapEnabledChange(),
    ]);
  }

  private getProtocolReadonlyContract(address: string): Contracts['defiProtocol'] {
    return createDefiProtocol(this.web3Manager.web3, address);
  }

  private getPoolTokenReadonlyContract(address: string): Contracts['savingsPoolToken'] {
    return createSavingsPoolToken(this.web3Manager.web3, address);
  }

  public getDepositFees$(
    userAddress: string,
    deposits: DepositToSavingsPool[],
  ): Observable<DepositToSavingsPoolWithFee[]> {
    return this.readonlyContract.methods.deposit
      .read(
        {
          _protocols: deposits.map(x => x.poolAddress),
          _tokens: deposits.map(x => x.amount.currency.address),
          _dnAmounts: deposits.map(x => x.amount.toBN()),
        },
        { from: userAddress },
      )
      .pipe(
        map(nDepositAmounts =>
          nDepositAmounts.map((nDepositAmount, index) => ({
            ...deposits[index],
            fee: deposits[index].amount.sub(
              denormolizeAmount(
                new TokenAmount(nDepositAmount, ALL_TOKEN),
                deposits[index].amount.currency,
              ),
            ),
          })),
        ),
      );
  }

  @autobind
  public getDepositEvent$(userAddress: string) {
    return fromWeb3DataEvent(
      this.readonlyContract.events.Deposit({
        filter: { user: userAddress },
      }),
    );
  }

  @autobind
  public getProtocolRegisteredEvent$() {
    return fromWeb3DataEvent(this.readonlyContract.events.ProtocolRegistered());
  }
}

function toLiquidityAmount$(amount$: Observable<BN | IToBN>): Observable<LiquidityAmount>;
function toLiquidityAmount$(amount$: Observable<Array<BN | IToBN>>): Observable<LiquidityAmount[]>;
function toLiquidityAmount$(
  amount$: Observable<BN | IToBN | Array<BN | IToBN>>,
): Observable<LiquidityAmount | LiquidityAmount[]> {
  return amount$.pipe(
    map(amounts =>
      Array.isArray(amounts)
        ? amounts.map(amount => new LiquidityAmount(amount, DEFAULT_LIQUIDITY_CURRENCY))
        : new LiquidityAmount(amounts, DEFAULT_LIQUIDITY_CURRENCY),
    ),
  );
}
