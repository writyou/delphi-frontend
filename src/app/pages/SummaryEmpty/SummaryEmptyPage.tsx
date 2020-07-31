import * as React from 'react';

import { Grid, Button } from 'components';
import { Fish, CatsPaw, ArrowStartToSave } from 'components/icons';
import { makeStyles } from 'utils/styles';
import { ActiveMembers, TotalValueLocked } from 'features/metrics';

import { PortfolioBalanceChart } from './Components/PortfolioBalanceChart';
import { AverageAPYMocked } from './Components/AverageAPYMocked';

export function SummaryEmptyPage() {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container xs>
        <Grid item xs>
          <div className={classes.chart}>
            <PortfolioBalanceChart />
          </div>
        </Grid>
        {renderMetrics()}
      </Grid>
    </Grid>
  );

  function renderMetrics() {
    return (
      <Grid container direction="column" xs className={classes.metrics}>
        <Grid container justify="space-between" className={classes.liveStats}>
          <Grid item>Live Stats</Grid>
          <Grid item>
            <ActiveMembers />
          </Grid>
          <Grid item>
            <TotalValueLocked />
          </Grid>
        </Grid>
        <Grid container justify="space-between" xs className={classes.metrics}>
          <AverageAPYMocked
            title="My Savings"
            value="10"
            icon={<CatsPaw className={classes.icon} />}
            button={
              <Button color="primary" variant="contained">
                Save
              </Button>
            }
          />
          <AverageAPYMocked
            title="My Investment"
            value="15"
            icon={<CatsPaw variant="turquoise" className={classes.icon} />}
            button={
              <Button color="primary" variant="contained">
                Invest
              </Button>
            }
          />
          <AverageAPYMocked
            title="DCA"
            value="15"
            icon={<CatsPaw variant="violet" className={classes.icon} />}
            button={
              <Button color="primary" variant="contained">
                DCA
              </Button>
            }
          />
          <AverageAPYMocked
            title="My Harvest"
            value="20"
            icon={<Fish className={classes.fishIcon} />}
          />
          <div className={classes.startToSave}>
            You don’t have any pools yet. Start to save and invest to get the harvest!
            <ArrowStartToSave className={classes.arrow} />
          </div>
        </Grid>
      </Grid>
    );
  }
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: 50,
    },
    chart: {
      maxWidth: 537,
      position: 'relative',
    },
    metrics: {
      position: 'relative',
    },
    liveStats: {
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: 40,
      marginBottom: 30,
    },
    icon: {
      fontSize: 50,
    },
    fishIcon: {
      fontSize: 90,
      height: 50,
    },
    startToSave: {
      position: 'absolute',
      bottom: 0,
      left: '-100%',
      display: 'flex',
      alignItems: 'center',
    },
    arrow: {
      fontSize: 50,
      marginLeft: 20,
      height: 40,
    },
  }),
  { name: 'SummaryEmptyPage' },
);
