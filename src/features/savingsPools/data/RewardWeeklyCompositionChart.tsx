import * as React from 'react';
import { LiquidityAmount, TokenAmount } from '@akropolis-web/primitives';
import { map } from 'rxjs/operators';

import { CompositionChart, TokensTableLegend, CompositionLegend, Grid, Loading } from 'components';
import { makeStyles } from 'utils/styles';
import { useSubscribable } from 'utils/react';
import { useApi, Api } from 'services/api';
import { DEFAULT_LIQUIDITY_CURRENCY } from 'utils/mock';

type Props = {
  poolAddress: string;
};

function getChartData$(api: Api, poolAddress: string) {
  return api.savings.getRewards$(poolAddress).pipe(
    map(rewards =>
      rewards.map(x => ({
        value: new LiquidityAmount(x, DEFAULT_LIQUIDITY_CURRENCY),
        payload: { originalAmount: x },
      })),
    ),
  );
}

function RewardWeeklyCompositionChart(props: Props) {
  const { poolAddress } = props;
  const classes = useStyles();
  const api = useApi();

  const chartDataRD = useSubscribable(() => getChartData$(api, poolAddress), [api]);

  return (
    <Loading data={chartDataRD}>
      {chartData => (
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
      )}
    </Loading>
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
