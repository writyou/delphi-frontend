import * as React from 'react';
import { LiquidityAmount, TokenAmount } from '@akropolis-web/primitives';

import {
  CompositionChart,
  TokensTableLegend,
  CompositionLegend,
  Grid,
  DeprecatedLoading,
} from 'components';
import { makeStyles } from 'utils/styles';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';
import { DEFAULT_LIQUIDITY_CURRENCY } from 'utils/mock';

type Props = {
  poolAddress: string;
};

function RewardWeeklyCompositionChart(props: Props) {
  const { poolAddress } = props;
  const classes = useStyles();

  const api = useApi();
  const [rewards, rewardsMeta] = useSubscribableDeprecated(
    () => api.savings.getRewards$(poolAddress),
    [api],
  );

  const chartData = React.useMemo(
    () =>
      rewards?.map(x => ({
        value: new LiquidityAmount(x, DEFAULT_LIQUIDITY_CURRENCY),
        payload: { originalAmount: x },
      })) || [],
    [rewards],
  );
  return (
    <DeprecatedLoading meta={rewardsMeta}>
      <Grid container spacing={3} wrap="nowrap">
        <Grid item>
          <CompositionChart withBackground chartData={chartData} size="medium" />
        </Grid>
        <Grid item className={classes.legend} xs>
          <CompositionLegend
            chartData={chartData}
            Template={templateProps => (
              <TokensTableLegend<LiquidityAmount, { originalAmount: TokenAmount }>
                getTokenAmount={x => x.pieData.payload.originalAmount}
                {...templateProps}
              />
            )}
          />
        </Grid>
      </Grid>
    </DeprecatedLoading>
  );
}

const useStyles = makeStyles(
  () => ({
    legend: {
      fontSize: 16,
    },
  }),
  { name: 'RewardWeeklyCompositionChart' },
);

export { RewardWeeklyCompositionChart };
