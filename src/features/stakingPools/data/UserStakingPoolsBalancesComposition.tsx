import React from 'react';
import { map, switchMap, filter } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { LiquidityAmount, TokenAmount } from '@akropolis-web/primitives';

import {
  CompositionChart,
  CompositionChartSkeleton,
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

type ChartData = PieChartData<LiquidityAmount, TokenAmount>[];

function getChartData$(api: Api): Observable<ChartData> {
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
  const chartDataRD = useSubscribable(() => getChartData$(api), [api]);

  return (
    <Grid container alignItems="center" spacing={3}>
      <Loading
        data={chartDataRD}
        loader={
          <Grid item>
            <CompositionChartSkeleton size={size} />
          </Grid>
        }
      >
        {chartData => (chartData.length ? renderChart(chartData) : renderChartPlaceholder())}
      </Loading>
    </Grid>
  );

  function renderChart(pieChartData: ChartData) {
    return (
      <>
        <Grid item>
          <CompositionChart
            withBackground
            chartData={pieChartData}
            InnerLegend={withInnerLegend ? ChartInnerLegend : undefined}
            size={size}
          />
        </Grid>
        {withCompositionLegend && (
          <Grid item>
            <CompositionLegend<LiquidityAmount, TokenAmount>
              chartData={pieChartData}
              Template={legendProps => (
                <SimpleLegend
                  {...legendProps}
                  renderLabel={({ pieData }) => pieData.payload.currency.symbol}
                />
              )}
            />
          </Grid>
        )}
      </>
    );
  }

  function renderChartPlaceholder() {
    return (
      <Grid item>
        <CatsPawPlaceholder variant="lilac" size={size} />
      </Grid>
    );
  }
}

function ChartInnerLegend() {
  return <Metric title="APY" value={<UserStakingPoolsAvgAPY />} />;
}
