import * as React from 'react';

import { Grid } from 'components';
import { makeStyles } from 'utils/styles';
import {
  ActiveMembers,
  TotalValueLocked,
  MyHarvest,
  DCA,
  MyInvestment,
  MySavings,
} from 'features/metrics';

import { PortfolioBalanceChart } from './Components/PortfolioBalanceChart';

export function SummaryPage() {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container xs>
        <Grid item xs>
          <div className={classes.chart}>
            <PortfolioBalanceChart />
          </div>
        </Grid>
        <Grid container direction="column" xs>
          <Grid container justify="space-between" className={classes.liveStats}>
            <Grid item>Live Stats</Grid>
            <Grid item>
              <ActiveMembers />
            </Grid>
            <Grid item>
              <TotalValueLocked />
            </Grid>
          </Grid>
          <Grid container justify="space-between" xs>
            <MySavings />
            <MyInvestment />
            <DCA />
            <MyHarvest />
          </Grid>
        </Grid>
      </Grid>
      <Grid container xs>
        Subpages
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: 50,
    },
    chart: {
      maxWidth: 537,
    },
    liveStats: {
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: 40,
      marginBottom: 30,
    },
  }),
  { name: 'Summary' },
);
