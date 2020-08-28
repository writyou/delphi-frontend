import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LiquidityAmount } from '@akropolis-web/primitives';

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

  public getStats$() {
    return this.subgraph.loadGlobalStats$();
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
        pools.length
          ? combineLatest(
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
            )
          : of([]),
      ),
      reduceLiquidityAmounts,
    );
  }
}

const reduceLiquidityAmounts = map<LiquidityAmount[], LiquidityAmount>(balances =>
  balances.reduce((acc, cur) => acc.add(cur), new LiquidityAmount(0, DEFAULT_LIQUIDITY_CURRENCY)),
);
