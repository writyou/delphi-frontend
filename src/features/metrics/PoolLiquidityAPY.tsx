import * as React from 'react';

import { Metric, Label, FormattedAmount, ChartProfit, Grid } from 'components';
import { percentAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

export function PoolLiquidityAPY() {
  const classes = useStyles();

  return (
    <Metric
      title={
        <div className={classes.title}>
          <Label>APY</Label>
        </div>
      }
      value={<FormattedAmount sum={percentAmount} />}
      subValue={
        <Grid container>
          <ChartProfit variant="increase" value="7.50" sign="+" />
          <div style={{ width: 44, height: 18, backgroundColor: 'red', marginLeft: 7 }} />
        </Grid>
      }
    />
  );
}

const useStyles = makeStyles(
  () => ({
    title: {
      marginBottom: 15,
    },
  }),
  { name: 'PoolLiquidityAPY' },
);
