import React from 'react';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

import {
  CompositionChart,
  SimpleLegend,
  CompositionLegend,
  Grid,
  Metric,
  Loading,
  PieChartData,
} from 'components';
import { useSubscribable } from 'utils/react';
import { useApi, Api } from 'services/api';
import { TokenAmount, LiquidityAmount } from 'model/entities';
import { DEFAULT_LIQUIDITY_CURRENCY } from 'utils/mock';

import { UserStakingPoolsAvgAPY } from './UserStakingPoolsAvgAPY';

type Props = {
  size: 'extra-small' | 'extra-large';
  withInnerLegend?: boolean;
  withCompositionLegend?: boolean;
};

function getChartData$(api: Api): Observable<PieChartData<LiquidityAmount, TokenAmount>[]> {
  return api.user.getMyStakingPools$().pipe(
    switchMap(pools =>
      combineLatest(
        pools.map(pool =>
          api.user.getFullStakingPoolBalance$(pool.address).pipe(
            switchMap(balance =>
              api.prices.getTokenPrice$(balance.currency.address).pipe(
                map(price => ({
                  value: new LiquidityAmount(balance.mul(price), DEFAULT_LIQUIDITY_CURRENCY),
                  payload: balance,
                })),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

export function UserStakingPoolsBalancesComposition(props: Props) {
  const { withInnerLegend, withCompositionLegend, size } = props;
  const api = useApi();
  const [chartData, chartDataMeta] = useSubscribable(() => getChartData$(api), [api]);

  return (
    <Loading meta={chartDataMeta}>
      {chartData && (
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <CompositionChart
              withBackground
              chartData={chartData}
              InnerLegend={withInnerLegend ? ChartInnerLegend : undefined}
              size={size}
            />
          </Grid>
          {withCompositionLegend && (
            <Grid item>
              <CompositionLegend<LiquidityAmount, TokenAmount>
                chartData={chartData}
                Template={legendProps => (
                  <SimpleLegend
                    {...legendProps}
                    renderLabel={({ pieData }) => pieData.payload.currency.symbol}
                  />
                )}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Loading>
  );
}

function ChartInnerLegend() {
  return <Metric title="APY" value={<UserStakingPoolsAvgAPY />} />;
}
