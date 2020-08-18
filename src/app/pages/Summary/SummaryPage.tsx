import * as React from 'react';

import { Grid, Label, Divider, Metric, FormattedAmount, CompositionChart } from 'components';
import { makeStyles } from 'utils/styles';
import { UserSavingsPoolsAvgAPY, UserSavingsPoolsBalancesComposition } from 'features/savingsPools';
import { percentAmount, getMockCompositionChartEntriesToken } from 'utils/mock';

import { PortfolioBalanceChart } from './Components/PortfolioBalanceChart';
import { LiveStats } from './Components/LiveStats';

export function SummaryPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={5}>
          <PortfolioBalanceChart />
        </Grid>
        <Grid item xs={7}>
          {renderMetrics()}
        </Grid>
      </Grid>
    </div>
  );

  function renderMetrics() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LiveStats />
        </Grid>
        <Grid item xs={12}>
          <Divider orientation="horizontal" />
        </Grid>
        <Grid item xs container direction="column" spacing={3} justify="space-between">
          <Grid item>
            <Label>Savings</Label>
          </Grid>
          <Grid item className={classes.chart}>
            <UserSavingsPoolsBalancesComposition size="extra-small" />
          </Grid>
          <Grid item>
            <Metric title="APY" value={<UserSavingsPoolsAvgAPY />} />
          </Grid>
        </Grid>
        <Grid item xs container direction="column" spacing={3} justify="space-between">
          <Grid item>
            <Label withComingSoon>Investment</Label>
          </Grid>
          <Grid item className={classes.chart}>
            <CompositionChart
              chartData={getMockCompositionChartEntriesToken(5)}
              size="extra-small"
            />
          </Grid>
          <Grid item>
            <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />
          </Grid>
        </Grid>
        <Grid item xs container direction="column" spacing={3} justify="space-between">
          <Grid item>
            <Label withComingSoon>DCA</Label>
          </Grid>
          <Grid item className={classes.chart}>
            <CompositionChart
              chartData={getMockCompositionChartEntriesToken(5)}
              size="extra-small"
            />
          </Grid>
          <Grid item>
            <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />
          </Grid>
        </Grid>
        <Grid item xs container direction="column" spacing={3} justify="space-between">
          <Grid item>
            <Label withComingSoon>Harvest</Label>
          </Grid>
          <Grid item className={classes.chart}>
            <CompositionChart
              chartData={getMockCompositionChartEntriesToken(5)}
              size="extra-small"
            />
          </Grid>
          <Grid item>
            <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const useStyles = makeStyles(
  () => ({
    root: {},
    comingSoon: {
      flexGrow: 1,
      alignSelf: 'center',
      display: 'flex',
      marginLeft: 10,
    },
    chart: {
      marginTop: 'auto',
    },
  }),
  { name: 'SummaryPage' },
);
