import * as React from 'react';

import { Metric, Label, Grid } from 'components';
import { makeStyles } from 'utils/styles';
import { UserSavingsPoolsBalancesComposition } from 'features/savingsPools/data/UserSavingsPoolsBalancesComposition';
import { UserSavingsPoolsAvgAPY } from 'features/savingsPools';

export function MySavings() {
  const classes = useStyles();

  return (
    <Metric
      title={
        <Grid container direction="column" className={classes.container}>
          <Label>My Savings</Label>
          <div className={classes.chart}>
            <UserSavingsPoolsBalancesComposition size="extra-small" />
          </div>
          APY
        </Grid>
      }
      value={<UserSavingsPoolsAvgAPY />}
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
