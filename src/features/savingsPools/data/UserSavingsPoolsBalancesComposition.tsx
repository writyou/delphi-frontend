import React from 'react';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { TokenAmount, sumTokenAmountsByToken } from '@akropolis-web/primitives';

import { makeStyles } from 'utils/styles';
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

import { UserSavingsPoolsAvgAPY } from './UserSavingsPoolsAvgAPY';

type Props = {
  size: 'extra-small' | 'extra-large';
  withInnerLegend?: boolean;
  withCompositionLegend?: boolean;
};

function getChartData$(api: Api): Observable<PieChartData<TokenAmount>[]> {
  return api.user.getMySavingsPools$().pipe(
    switchMap(pools =>
      pools.length
        ? combineLatest(pools.map(pool => api.user.getSavingsPoolBalances$(pool.address)))
        : of([]),
    ),
    map(balances =>
      sumTokenAmountsByToken(balances.flat())
        .filter(balance => !balance.isZero())
        .map(balance => ({
          value: balance,
          payload: undefined,
        })),
    ),
  );
}

export function UserSavingsPoolsBalancesComposition(props: Props) {
  const { withInnerLegend, withCompositionLegend, size } = props;
  const api = useApi();
  const [chartData, chartDataMeta] = useSubscribable(() => getChartData$(api), [api]);

  return (
    <Grid container alignItems="center" spacing={3}>
      <Loading
        meta={chartDataMeta}
        loader={
          <Grid item>
            <CompositionChartSkeleton size={size} />
          </Grid>
        }
      >
        {chartData?.length ? renderChart(chartData) : renderChartPlaceholder()}
      </Loading>
    </Grid>
  );

  function renderChart(pieChartData: NonNullable<typeof chartData>) {
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
            <CompositionLegend<TokenAmount>
              chartData={pieChartData}
              Template={legendProps => (
                <SimpleLegend
                  {...legendProps}
                  renderLabel={({ pieData }) => pieData.value.currency.symbol}
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
  const classes = useStyles();
  return (
    <div className={classes.chartInnerLegend}>
      <Metric title="APY" value={<UserSavingsPoolsAvgAPY />} />
    </div>
  );
}

const useStyles = makeStyles({
  chartInnerLegend: {
    marginTop: -27, // TODO refactor negative margin
  },
});
