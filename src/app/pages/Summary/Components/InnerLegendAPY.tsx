import * as React from 'react';

import { Metric, FormattedAmount, Grid, Typography } from 'components';
import { percentAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

export function InnerLegendAPY() {
  const classes = useStyles();

  return (
    <Metric
      title={
        <Grid container direction="column" className={classes.container} justify="center">
          <Typography align="center" className={classes.title}>
            APY
          </Typography>
        </Grid>
      }
      value={<FormattedAmount sum={percentAmount} />}
    />
  );
}

const useStyles = makeStyles(
  () => ({
    container: {},
    title: {
      fontSize: 16,
    },
  }),
  { name: 'InnerLegendAPY' },
);
