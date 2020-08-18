import { Observable, empty, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as R from 'ramda';
import {
  TokenAmount,
  LiquidityAmount,
  PercentAmount,
  Fraction,
  calcAvg,
} from '@akropolis-web/primitives';

import { memoize } from 'utils/decorators';
import { SavingsPool, DepositToSavingsPool, StakingPool } from 'model/types';

import { Web3ManagerModule } from '../types';
import { Erc20Api } from './Erc20Api';
import { SubgraphApi } from './SubgraphApi/SubgraphApi';
import { SavingsModuleApi } from './SavingsModuleApi';
import { DCAModuleApi } from './DCAModuleApi';
import { StakingModuleApi } from './StakingModuleApi';
import { RewardsApi } from './RewardsApi';

export class UserApi {
  constructor(
    private web3Manager: Web3ManagerModule,
    private subgraph: SubgraphApi,
    private erc20: Erc20Api,
    private savings: SavingsModuleApi,
    private dca: DCAModuleApi,
    private staking: StakingModuleApi,
    private rewards: RewardsApi,
  ) {}

  @memoize(R.identity)
  public getUser$(): Observable<User | null> {
    return this.web3Manager.account$.pipe(
      switchMap(account => (account ? this.subgraph.loadUser$(account) : empty())),
    );
  }

  @memoize(R.identity)
  public getTokenBalance$(address: string): Observable<TokenAmount> {
    return this.web3Manager.account$.pipe(
      switchMap(account => (account ? this.erc20.getBalance$(address, account) : empty())),
    );
  }

  @memoize()
  public getSavingsPoolsAvgAPY$(): Observable<PercentAmount> {
    return this.getMySavingsPools$().pipe(
      switchMap(pools =>
        combineLatest(
          pools.map(pool =>
            this.getSavingsPoolBalance$(pool.address).pipe(map(balance => ({ balance, pool }))),
          ),
        ),
      ),
      map(
        balances =>
          new PercentAmount(
            calcAvg(...balances.map(({ balance, pool }) => ({ value: pool.apy, weight: balance }))),
          ),
      ),
    );
  }

  @memoize()
  public getAllSavingsPoolsBalances$(): Observable<
    Array<{
      balance: LiquidityAmount;
      pool: SavingsPool;
    }>
  > {
    return this.getMySavingsPools$().pipe(
      switchMap(pools =>
        combineLatest(
          pools.map(pool =>
            this.getSavingsPoolBalance$(pool.address).pipe(map(balance => ({ balance, pool }))),
          ),
        ),
      ),
    );
  }

  @memoize(R.identity)
  public getSavingsPoolBalances$(poolAddress: string): Observable<TokenAmount[]> {
    return combineLatest([
      this.getSavingsPoolBalance$(poolAddress),
      this.savings.getPoolBalance$(poolAddress),
      this.savings.getPoolBalances$(poolAddress),
    ]).pipe(
      map(([userBalance, poolBalance, poolBalances]) => {
        const userShare = poolBalance.isZero() ? 0 : new Fraction(userBalance).div(poolBalance);
        return poolBalances.map(balance => balance.mul(userShare));
      }),
    ) as any;
  }

  @memoize(R.identity)
  public getSavingsPoolBalance$(address: string): Observable<LiquidityAmount> {
    return this.web3Manager.account$.pipe(
      switchMap(account => (account ? this.savings.getUserBalance$(address, account) : empty())),
    );
  }

  @memoize()
  public getMySavingsPools$(): Observable<SavingsPool[]> {
    return this.web3Manager.account$.pipe(
      switchMap(account => (account ? this.subgraph.loadUserSavingsPools$(account) : empty())),
    );
  }

  public getSavingsDepositFees$(deposits: DepositToSavingsPool[]) {
    return this.web3Manager.account$.pipe(
      switchMap(account => (account ? this.savings.getDepositFees$(account, deposits) : empty())),
    );
  }

  public getSavingsWithdrawFee$(poolAddress: string, amount: TokenAmount): Observable<TokenAmount> {
    return this.web3Manager.account$.pipe(
      switchMap(account =>
        account ? this.savings.getWithdrawFee$(account, poolAddress, amount) : empty(),
      ),
    );
  }

  @memoize(R.identity)
  public getSavingsDepositLimit$(poolAddress: string): Observable<LiquidityAmount | null> {
    return this.web3Manager.account$.pipe(
      switchMap(account =>
        account ? this.savings.getDepositLimit$(account, poolAddress) : empty(),
      ),
    );
  }

  @memoize(R.identity)
  public getDCAPoolBalance$(address: string): Observable<LiquidityAmount> {
    return this.web3Manager.account$.pipe(
      switchMap(account => (account ? this.dca.getUserBalance$(address, account) : empty())),
    );
  }

  @memoize(R.identity)
  public getDCATokenToSellBalance$(poolAddress: string): Observable<TokenAmount> {
    return this.web3Manager.account$.pipe(
      switchMap(account =>
        account ? this.dca.getTokenToSellBalance$(poolAddress, account) : empty(),
      ),
    );
  }

  @memoize(R.identity)
  public getFullStakingPoolBalance$(address: string): Observable<TokenAmount> {
    return this.web3Manager.account$.pipe(
      switchMap(account =>
        account ? this.staking.getFullUserBalance$(address, account) : empty(),
      ),
    );
  }

  @memoize(R.identity)
  public getUnlockedStakingPoolBalance$(address: string): Observable<TokenAmount> {
    return this.web3Manager.account$.pipe(
      switchMap(account =>
        account ? this.staking.getUnlockedUserBalance$(address, account) : empty(),
      ),
    );
  }

  @memoize(R.identity)
  public getStakingDepositLimit$(poolAddress: string): Observable<TokenAmount | null> {
    return this.web3Manager.account$.pipe(
      switchMap(account =>
        account ? this.staking.getDepositLimit$(poolAddress, account) : empty(),
      ),
    );
  }

  @memoize()
  public getMyStakingPools$(): Observable<StakingPool[]> {
    return this.web3Manager.account$.pipe(
      switchMap(account => (account ? this.staking.getPools$() : empty())),
      switchMap(pools =>
        combineLatest(
          pools.map(pool =>
            this.getFullStakingPoolBalance$(pool.address).pipe(
              map(balance => (balance.isZero() ? null : pool)),
            ),
          ),
        ),
      ),
      map(pools => pools.filter((pool): pool is StakingPool => !!pool)),
    );
  }

  @memoize()
  public getRewards$(): Observable<TokenAmount[]> {
    return this.web3Manager.account$.pipe(
      switchMap(account => (account ? this.rewards.getUserRewards$(account) : empty())),
    );
  }
}
