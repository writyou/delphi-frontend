import * as React from 'react';
import { Grid } from '@akropolis-web/components';

import { makeStyles } from 'utils/styles';
import { PeriodSwitch } from 'components/Chart/components/PeriodSwitch/PeriodSwitch';
import { ChartWithCat } from 'components/icons';
import { Label } from 'components/Label';

function PortfolioBalanceChart() {
  const classes = useStyles();

  return (
    <Grid container spacing={4} direction="column" className={classes.root}>
      <Grid item container justify="space-between">
        <Grid item className={classes.chartHeaderItem}>
          <Label withComingSoon>Portfolio balance</Label>
        </Grid>
        <Grid item className={classes.chartHeaderItem}>
          <PeriodSwitch period="all" onSelect={() => {}} />
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={12}>
          <ChartWithCat className={classes.cat} hideText />
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      maxWidth: 553,
    },
    cat: {
      width: '100%',
      height: 'unset',
    },
    chartHeaderItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 0',
    },
  }),
  { name: 'PortfolioBalanceChart' },
);

export { PortfolioBalanceChart };
