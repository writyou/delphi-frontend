import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Grid, Button, Divider, Metric, Label, FormattedAmount } from 'components';
import { Fish, CatsPaw, ArrowStartToSave } from 'components/icons';
import { makeStyles } from 'utils/styles';
import { percentAmount } from 'utils/mock';
import { routes } from 'app/routes';

import { PortfolioBalanceChart } from './Components/PortfolioBalanceChart';
import { LiveStats } from '../Summary/Components/LiveStats';

export function SummaryEmptyPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={5} container direction="column" justify="space-between">
          <Grid item xs>
            <PortfolioBalanceChart />
          </Grid>
          <Grid item>
            <div className={classes.startToSave}>
              You don’t have any pools yet. Start to save and invest to get the harvest!
              <ArrowStartToSave className={classes.arrow} />
            </div>
          </Grid>
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
        {[
          {
            title: <Label>My Savings</Label>,
            chart: <CatsPaw className={classes.icon} />,
            apy: <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />,
            button: (
              <Button
                component={RouterLink}
                to={routes.savings.getRedirectPath()}
                size="small"
                color="primary"
                variant="contained"
              >
                Save
              </Button>
            ),
          },
          {
            title: <Label withComingSoon>My Investment</Label>,
            chart: <CatsPaw variant="turquoise" className={classes.icon} />,
            apy: <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />,
            button: renderMockedButton('Invest'),
          },
          {
            title: <Label withComingSoon>DCA</Label>,
            chart: <CatsPaw variant="violet" className={classes.icon} />,
            apy: <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />,
            button: renderMockedButton('DCA'),
          },
          {
            title: <Label withComingSoon>My Harvest</Label>,
            chart: <Fish className={classes.fishIcon} />,
            apy: <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />,
            button: renderMockedButton('Hidden', true),
          },
        ].map(({ apy, button, chart, title }, index) => (
          <Grid key={index} item xs container direction="column" spacing={3}>
            <Grid item>{title}</Grid>
            <Grid item className={classes.chart}>
              {chart}
            </Grid>
            <Grid item>{apy}</Grid>
            <Grid item>{button}</Grid>
          </Grid>
        ))}
      </Grid>
    );

    function renderMockedButton(text: string, hidden?: boolean) {
      return (
        <Button
          disabled
          size="small"
          color="primary"
          variant="contained"
          hidden={hidden}
          className={hidden ? classes.hidden : undefined}
        >
          {text}
        </Button>
      );
    }
  }
}

const useStyles = makeStyles(
  () => ({
    root: {},
    icon: {
      fontSize: 50,
    },
    fishIcon: {
      fontSize: 90,
      height: 50,
    },
    startToSave: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    arrow: {
      fontSize: 50,
      marginLeft: 20,
      height: 30,
    },
    chart: {
      marginTop: 'auto',
    },
    hidden: {
      visibility: 'hidden',
    },
  }),
  { name: 'SummaryEmptyPage' },
);
