import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { LiquidityAmount } from 'model/entities';
import { DEFAULT_LIQUIDITY_CURRENCY } from 'utils/mock';

import { SubgraphApi } from './SubgraphApi';
import { SavingsModuleApi } from './SavingsModuleApi';

export class GlobalStatsApi {
  constructor(private subgraph: SubgraphApi, private savings: SavingsModuleApi) {}

  public getUsersCount$(): Observable<number> {
    return this.subgraph.loadUsersLength$();
  }

  public getTotalPoolsBalance$(): Observable<LiquidityAmount> {
    return this.subgraph.loadSavingsPools$().pipe(
      switchMap(pools =>
        combineLatest(pools.map(pool => this.savings.getPoolBalance$(pool.address))),
      ),
      map(balances =>
        balances.reduce(
          (acc, cur) => acc.add(cur),
          new LiquidityAmount(0, DEFAULT_LIQUIDITY_CURRENCY),
        ),
      ),
    );
  }
}
