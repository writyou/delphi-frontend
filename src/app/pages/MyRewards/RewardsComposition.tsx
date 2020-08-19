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
} from 'components';
import { CatsPaw } from 'components/icons';
import { percentAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

export function RewardsComposition({
  data,
}: {
  data: PieChartData<LiquidityAmount, TokenAmount>[];
}) {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item>
        {data.length ? (
          <CompositionChart withBackground chartData={data} size="extra-small" />
        ) : (
          <CatsPaw className={classes.icon} />
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
