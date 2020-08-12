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
import { TokenAmount } from 'model/entities';
import { sumTokenAmountsByToken } from 'utils/amounts';

import { UserSavingsPoolsAvgAPY } from './UserSavingsPoolsAvgAPY';

type Props = {
  size: 'extra-small' | 'extra-large';
  withInnerLegend?: boolean;
  withCompositionLegend?: boolean;
};

function getChartData$(api: Api): Observable<PieChartData<TokenAmount>[]> {
  return api.user.getMySavingsPools$().pipe(
    switchMap(pools =>
      combineLatest(pools.map(pool => api.user.getSavingsPoolBalances$(pool.address))),
    ),
    map(balances =>
      sumTokenAmountsByToken(balances.flat()).map(balance => ({
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
              <CompositionLegend<TokenAmount>
                chartData={chartData}
                Template={legendProps => (
                  <SimpleLegend
                    {...legendProps}
                    renderLabel={({ pieData }) => pieData.value.currency.symbol}
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
  return <Metric title="APY" value={<UserSavingsPoolsAvgAPY />} />;
}
