import React from 'react';
import { map } from 'rxjs/operators';

import {
  CompositionChart,
  SimpleLegend,
  CompositionLegend,
  Grid,
  Metric,
  Loading,
} from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { LiquidityAmount } from 'model/entities';
import { SavingsPool } from 'model/types';

import { UserSavingsPoolsAvgAPY } from './UserSavingsPoolsAvgAPY';

type Props = {
  size: 'extra-small' | 'extra-large';
  withInnerLegend?: boolean;
  withCompositionLegend?: boolean;
};

export function UserSavingsPoolsBalancesComposition(props: Props) {
  const { withInnerLegend, withCompositionLegend, size } = props;
  const api = useApi();
  const [chartData, chartDataMeta] = useSubscribable(
    () =>
      api.user
        .getAllSavingsPoolsBalances$()
        .pipe(
          map(balances => balances.map(({ balance, pool }) => ({ value: balance, payload: pool }))),
        ),
    [api],
  );

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
              <CompositionLegend<LiquidityAmount, SavingsPool>
                chartData={chartData}
                Template={legendProps => (
                  <SimpleLegend
                    {...legendProps}
                    renderLabel={({ pieData }) => pieData.payload.poolName}
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
