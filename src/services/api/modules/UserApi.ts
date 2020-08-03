import { Observable, empty, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as R from 'ramda';

import { memoize } from 'utils/decorators';
import { TokenAmount, LiquidityAmount, PercentAmount } from 'model/entities';
import { SavingsPool } from 'model/types';
import { calcAvg } from 'utils/amounts';

import { Web3ManagerModule } from '../types';
import { Erc20Api } from './Erc20Api';
import { SubgraphApi } from './SubgraphApi/SubgraphApi';
import { SavingsModuleApi } from './SavingsModuleApi';

export class UserApi {
  constructor(
    private web3Manager: Web3ManagerModule,
    private subgraph: SubgraphApi,
    private erc20: Erc20Api,
    private savings: SavingsModuleApi,
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
}