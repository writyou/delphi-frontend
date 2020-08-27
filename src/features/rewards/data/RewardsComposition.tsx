import React from 'react';
import { LiquidityAmount, TokenAmount } from '@akropolis-web/primitives';

import {
  FormattedAmount,
  CompositionChart,
  SimpleLegend,
  PieChartData,
  CompositionLegend,
  Grid,
  Metric,
  Loading,
} from 'components';
import { CatPaws } from 'components/icons';
import { percentAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { RewardData } from 'model/types';

function makeChartData(entries: RewardData[]): PieChartData<LiquidityAmount, TokenAmount>[] {
  return (entries || []).map(order => ({
    value: order.NAV,
    payload: order.amount,
  }));
}

export function RewardsComposition() {
  const classes = useStyles();
  const api = useApi();
  const rewardsDataRD = useSubscribable(() => api.user.getRewardsData$(), [api]);
  return (
    <Loading data={rewardsDataRD}>
      {rewardsData => {
        const chartData = makeChartData(rewardsData);
        return (
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              {chartData.length ? (
                <CompositionChart withBackground chartData={chartData} size="extra-small" />
              ) : (
                <CatPaws className={classes.icon} />
              )}
            </Grid>
            <Grid item>
              {chartData.length ? (
                <CompositionLegend<LiquidityAmount, TokenAmount>
                  chartData={chartData}
                  Template={props => (
                    <SimpleLegend
                      {...props}
                      renderLabel={({ pieData }) => pieData.payload.currency.symbol}
                    />
                  )}
                />
              ) : (
                <Metric
                  title="APY"
                  value={<FormattedAmount sum={percentAmount} />}
                  variant="condensed"
                />
              )}
            </Grid>
          </Grid>
        );
      }}
    </Loading>
  );
}

const useStyles = makeStyles(
  () => ({
    icon: {
      fontSize: 50,
    },
  }),
  { name: 'RewardsComposition' },
);
