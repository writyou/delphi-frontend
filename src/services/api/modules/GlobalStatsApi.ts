import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { LiquidityAmount } from 'model/entities';
import { DEFAULT_LIQUIDITY_CURRENCY } from 'utils/mock';
import { memoize } from 'utils/decorators';

import { SubgraphApi } from './SubgraphApi';
import { SavingsModuleApi } from './SavingsModuleApi';
import { StakingModuleApi } from './StakingModuleApi';
import { PricesApi } from './PriceApi';

export class GlobalStatsApi {
  constructor(
    private subgraph: SubgraphApi,
    private savings: SavingsModuleApi,
    private staking: StakingModuleApi,
    private prices: PricesApi,
  ) {}

  public getUsersCount$(): Observable<number> {
    return this.subgraph.loadUsersLength$();
  }

  @memoize()
  public getTotalPoolsBalance$(): Observable<LiquidityAmount> {
    return combineLatest([
      this.getTotalSavingsPoolsBalance$(),
      this.getTotalStakingPoolsBalance$(),
    ]).pipe(reduceLiquidityAmounts);
  }

  @memoize()
  private getTotalSavingsPoolsBalance$(): Observable<LiquidityAmount> {
    return this.savings.getPools$().pipe(
      switchMap(pools =>
        combineLatest(pools.map(pool => this.savings.getPoolBalance$(pool.address))),
      ),
      reduceLiquidityAmounts,
    );
  }

  @memoize()
  private getTotalStakingPoolsBalance$(): Observable<LiquidityAmount> {
    return this.staking.getPools$().pipe(
      switchMap(pools =>
        combineLatest(
          pools.map(pool =>
            this.staking
              .getPoolBalance$(pool.address)
              .pipe(
                switchMap(balance =>
                  this.prices
                    .getTokenPrice$(balance.currency.address)
                    .pipe(
                      map(
                        price =>
                          new LiquidityAmount(balance.mul(price), DEFAULT_LIQUIDITY_CURRENCY),
                      ),
                    ),
                ),
              ),
          ),
        ),
      ),
      reduceLiquidityAmounts,
    );
  }
}

const reduceLiquidityAmounts = map<LiquidityAmount[], LiquidityAmount>(balances =>
  balances.reduce((acc, cur) => acc.add(cur), new LiquidityAmount(0, DEFAULT_LIQUIDITY_CURRENCY)),
);
