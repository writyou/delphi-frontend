import * as React from 'react';

import { Metric, Label, FormattedAmount, Grid, CompositionChart, PieChartData } from 'components';
import { percentAmount, tokenAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';
import { TokenAmount } from 'model/entities';

const entries = new Array<PieChartData<TokenAmount>>(5).fill({
  value: tokenAmount,
  payload: undefined,
});

export function MyInvestment() {
  const classes = useStyles();

  return (
    <Metric
      title={
        <Grid container direction="column" className={classes.container}>
          <Label withComingSoon>My Investment</Label>
          <div className={classes.chart}>
            <CompositionChart chartData={entries} size="extra-small" />
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
  { name: 'MyInvestment' },
);
