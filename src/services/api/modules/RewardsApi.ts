import { combineLatest, of, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { LiquidityAmount, TokenAmount } from '@akropolis-web/primitives';
import * as R from 'ramda';
import { autobind } from 'core-decorators';

import { DEFAULT_LIQUIDITY_CURRENCY } from 'utils/mock';
import { getLiquidityAmountsSum } from 'utils/helpers';
import { RewardData } from 'model/types';
import { memoize } from 'utils/decorators';

import { SavingsModuleApi } from './SavingsModuleApi';
import { PricesApi } from './PriceApi';

export class RewardsApi {
  constructor(private savings: SavingsModuleApi, private prices: PricesApi) {}

  @memoize(R.identity)
  public getUserRewards$(userAddress: string) {
    return this.savings
      .getUserRewards$(userAddress)
      .pipe(map(rewards => rewards.filter(a => !a.isZero())));
  }

  @autobind
  public withdrawUserRewards(rewards: TokenAmount[]) {
    return this.savings.withdrawUserRewards(rewards);
  }

  @memoize(R.identity)
  public getUserTotalRewardsBalance(userAddress: string): Observable<LiquidityAmount> {
    return this.getUserRewards$(userAddress).pipe(
      switchMap(rewards =>
        rewards.length
          ? combineLatest(rewards.map(a => this.prices.getTokenPrice$(a.currency.address))).pipe(
              map(prices =>
                rewards.map(
                  (amount, i) =>
                    new LiquidityAmount(amount.mul(prices[i]), DEFAULT_LIQUIDITY_CURRENCY),
                ),
              ),
            )
          : of([]),
      ),
      map(getLiquidityAmountsSum),
    );
  }

  @memoize(R.identity)
  public getUserRewardsData$(userAddress: string) {
    return this.getUserRewards$(userAddress).pipe(
      switchMap(rewards =>
        rewards.length
          ? combineLatest(rewards.map(a => this.prices.getTokenPrice$(a.currency.address))).pipe(
              map(prices =>
                rewards.map(
                  (amount, i): RewardData => ({
                    amount,
                    NAV: new LiquidityAmount(amount.mul(prices[i]), DEFAULT_LIQUIDITY_CURRENCY),
                  }),
                ),
              ),
            )
          : of([]),
      ),
      map(data => data.sort((a, b) => b.NAV.sub(a.NAV).toNumber())),
    );
  }
}
