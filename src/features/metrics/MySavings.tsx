import * as React from 'react';

import { Metric, Label, FormattedAmount, ChartMock, Grid } from 'components';
import { percentAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

export function MySavings() {
  const classes = useStyles();

  return (
    <Metric
      title={
        <Grid container direction="column" className={classes.container}>
          <Label>My Savings</Label>
          <div className={classes.chart}>
            <ChartMock />
          </div>
          APY
        </Grid>
      }
      value={<FormattedAmount sum={percentAmount} />}
    />
  );
}

const useStyles = makeStyles(
  () => ({
    container: {
      marginBottom: 16,
    },
    title: {
      fontSize: 12,
    },
    chart: {
      marginTop: 26,
      marginBottom: 26,
    },
  }),
  { name: 'MySavings' },
);
