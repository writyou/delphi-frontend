/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { Observable, combineLatest, timer } from 'rxjs';
import { autobind } from 'core-decorators';
import BN from 'bn.js';
import { switchMap, map } from 'rxjs/operators';
import * as R from 'ramda';
import { TokenAmount, Token } from '@akropolis-web/primitives';

import { getSignificantValue } from 'utils';
import { WithdrawFromStakingPool, DepositToStakingPool } from 'model/types';
import { memoize } from 'utils/decorators';
import { StakingPool } from 'model/types/staking';
import { getCurrentValueOrThrow } from 'utils/rxjs';
import { createStakingPool } from 'generated/contracts';
import { ETH_NETWORK_CONFIG, WEB3_LONG_POOLING_TIMEOUT } from 'env';

import { Erc20Api } from './Erc20Api';
import { Contracts, Web3ManagerModule } from '../types';
import { TransactionsApi } from './TransactionsApi';

export class StakingModuleApi {
  constructor(
    private web3Manager: Web3ManagerModule,
    private transactionsApi: TransactionsApi,
    private erc20: Erc20Api,
  ) {}

  @memoize()
  public getPools$(): Observable<StakingPool[]> {
    return combineLatest([this.getPool$(ETH_NETWORK_CONFIG.contracts.akroStakingPool)]);
  }

  @memoize(R.identity)
  public getPool$(poolAddress: string): Observable<StakingPool> {
    const akroPoolContract = this.getPoolReadonlyContract(poolAddress);

    return akroPoolContract.methods.token().pipe(
      switchMap(token => this.erc20.getToken$(token)),
      map<Token, StakingPool>(token => ({
        token,
        address: poolAddress,
        poolName: 'AKRO Staking',
      })),
    );
  }

  @memoize((...args: string[]) => args.join())
  public getFullUserBalance$(poolAddress: string, account: string): Observable<TokenAmount> {
    const poolContract = this.getPoolReadonlyContract(poolAddress);

    return combineLatest([
      this.getPool$(poolAddress),
      poolContract.methods.getPersonalStakes(
        {
          _address: account,
        },
        [
          poolContract.events.Staked({ filter: { user: account } }),
          poolContract.events.Unstaked({ filter: { user: account } }),
        ],
      ),
    ]).pipe(
      map(
        ([pool, [, amounts]]) =>
          new TokenAmount(
            amounts.reduce((acc, cur) => acc.add(cur), new BN(0)), // TODO check this
            pool.token,
          ),
      ),
    );
  }

  @memoize((...args: string[]) => args.join())
  public getUnlockedUserBalance$(poolAddress: string, account: string): Observable<TokenAmount> {
    const poolContract = this.getPoolReadonlyContract(poolAddress);

    return combineLatest([
      this.getPool$(poolAddress),
      timer(0, WEB3_LONG_POOLING_TIMEOUT).pipe(
        switchMap(() =>
          poolContract.methods.unstakeAllUnlocked.read(
            {
              _data: '0x00',
            },
            { from: account },
            [
              poolContract.events.Staked({ filter: { user: account } }),
              poolContract.events.Unstaked({ filter: { user: account } }),
            ],
          ),
        ),
      ),
    ]).pipe(map(([pool, unlocked]) => new TokenAmount(unlocked, pool.token)));
  }

  @memoize((...args: string[]) => args.join())
  public getDepositLimit$(poolAddress: string, account: string): Observable<TokenAmount | null> {
    const poolContract = this.getPoolReadonlyContract(poolAddress);

    return combineLatest([
      this.getPool$(poolAddress),
      this.getDepositLimitsEnabled$(poolAddress),
      poolContract.methods.userCap(
        {
          '': account,
        },
        [
          poolContract.events.UserCapChanged({ filter: { user: account } }),
          poolContract.events.UserCapEnabledChange(),
        ],
      ),
    ]).pipe(
      map(([pool, enabled, cap]) => {
        const roundedCap = cap.gt(getSignificantValue(pool.token.decimals)) ? cap : new BN(0);
        return enabled ? new TokenAmount(roundedCap, pool.token) : null;
      }),
    );
  }

  @memoize(R.identity)
  private getDepositLimitsEnabled$(poolAddress: string): Observable<boolean> {
    const poolContract = this.getPoolReadonlyContract(poolAddress);

    return poolContract.methods.userCapEnabled(undefined, [
      poolContract.events.UserCapEnabledChange(),
    ]);
  }

  @memoize(R.identity)
  public getPoolBalance$(poolAddress: string): Observable<TokenAmount> {
    const poolContract = this.getPoolReadonlyContract(poolAddress);

    return combineLatest([
      this.getPool$(poolAddress),
      poolContract.methods.totalStaked(undefined, [
        poolContract.events.Staked(),
        poolContract.events.Unstaked(),
      ]),
    ]).pipe(map(([pool, staked]) => new TokenAmount(staked, pool.token)));
  }

  @autobind
  public async deposit(deposit: DepositToStakingPool): Promise<void> {
    const txContract = this.getPoolTxContract(deposit.poolAddress);
    const from = getCurrentValueOrThrow(this.web3Manager.account$);

    await this.erc20.approve(from, ETH_NETWORK_CONFIG.contracts.akroStakingPool, deposit.amount);

    const promiEvent = txContract.methods.stake(
      {
        _amount: deposit.amount.toBN(),
        _data: '0x00',
      },
      { from },
    );

    this.transactionsApi.pushToSubmittedTransactions('staking.deposit', promiEvent, {
      deposit,
      fromAddress: from,
    });

    await promiEvent;
  }

  @autobind
  public async withdraw(withdraw: WithdrawFromStakingPool): Promise<void> {
    const txContract = this.getPoolTxContract(withdraw.poolAddress);
    const from = getCurrentValueOrThrow(this.web3Manager.account$);

    const promiEvent = txContract.methods.unstakeAllUnlocked({ _data: '0x00' }, { from });

    this.transactionsApi.pushToSubmittedTransactions('staking.withdraw', promiEvent, {
      withdraw,
      fromAddress: from,
    });

    await promiEvent;
  }

  private getPoolTxContract(address: string): Contracts['stakingPool'] {
    const txWeb3 = getCurrentValueOrThrow(this.web3Manager.txWeb3$);

    return createStakingPool(txWeb3, address);
  }

  private getPoolReadonlyContract(address: string): Contracts['stakingPool'] {
    return createStakingPool(this.web3Manager.web3, address);
  }
}
