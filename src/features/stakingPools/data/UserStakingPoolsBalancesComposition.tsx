import React from 'react';
import { map, switchMap, filter } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { LiquidityAmount, TokenAmount } from '@akropolis-web/primitives';

import {
  CompositionChart,
  SimpleLegend,
  CompositionLegend,
  Grid,
  Metric,
  Loading,
  PieChartData,
  CatsPawPlaceholder,
} from 'components';
import { useSubscribable } from 'utils/react';
import { useApi, Api } from 'services/api';
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
      pools.length
        ? combineLatest(
            pools.map(pool =>
              api.user.getFullStakingPoolBalance$(pool.address).pipe(
                switchMap(balance =>
                  api.prices.getTokenPrice$(balance.currency.address).pipe(
                    map(price => ({
                      value: new LiquidityAmount(balance.mul(price), DEFAULT_LIQUIDITY_CURRENCY),
                      payload: balance,
                    })),
                    filter(({ value }) => !value.isZero()),
                  ),
                ),
              ),
            ),
          )
        : of([]),
    ),
  );
}

export function UserStakingPoolsBalancesComposition(props: Props) {
  const { withInnerLegend, withCompositionLegend, size } = props;
  const api = useApi();
  const [chartData, chartDataMeta] = useSubscribable(() => getChartData$(api), [api]);

  return (
    <Loading meta={chartDataMeta}>
      <Grid container alignItems="center" spacing={3}>
        <Grid item>
          {chartData?.length ? (
            <CompositionChart
              withBackground
              chartData={chartData}
              InnerLegend={withInnerLegend ? ChartInnerLegend : undefined}
              size={size}
            />
          ) : (
            <CatsPawPlaceholder variant="lilac" size={size} />
          )}
        </Grid>
        {withCompositionLegend && chartData?.length && (
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
    </Loading>
  );
}

function ChartInnerLegend() {
  return <Metric title="APY" value={<UserStakingPoolsAvgAPY />} />;
}
