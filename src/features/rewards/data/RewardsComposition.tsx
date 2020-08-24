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
  DeprecatedLoading,
} from 'components';
import { CatPaws } from 'components/icons';
import { percentAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';
import { RewardData } from 'model/types';

function makeChartData(
  entries: RewardData[] | undefined,
): PieChartData<LiquidityAmount, TokenAmount>[] {
  return (entries || []).map(order => ({
    value: order.NAV,
    payload: order.amount,
  }));
}

export function RewardsComposition() {
  const classes = useStyles();
  const api = useApi();
  const [rewardsData, rewardsMeta] = useSubscribableDeprecated(() => api.user.getRewardsData$(), [
    api,
  ]);
  const data = makeChartData(rewardsData);
  return (
    <DeprecatedLoading meta={rewardsMeta}>
      <Grid container alignItems="center" spacing={3}>
        <Grid item>
          {data.length ? (
            <CompositionChart withBackground chartData={data} size="extra-small" />
          ) : (
            <CatPaws className={classes.icon} />
          )}
        </Grid>
        <Grid item>
          {data.length ? (
            <CompositionLegend<LiquidityAmount, TokenAmount>
              chartData={data}
              Template={props => (
                <SimpleLegend
                  {...props}
                  renderLabel={({ pieData }) => pieData.payload.currency.symbol}
                />
              )}
            />
          ) : (
            <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />
          )}
        </Grid>
      </Grid>
    </DeprecatedLoading>
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
