import * as React from 'react';

import { Grid, Button, Divider } from 'components';
import { Fish, CatsPaw, ArrowStartToSave } from 'components/icons';
import { makeStyles } from 'utils/styles';

import { PortfolioBalanceChart } from './Components/PortfolioBalanceChart';
import { AverageAPYMocked } from './Components/AverageAPYMocked';
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
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
          <AverageAPYMocked
            withComingSoon
            title="My Investment"
            value="15"
            icon={<CatsPaw variant="turquoise" className={classes.icon} />}
            button={
              <Button color="primary" variant="contained">
                Invest
              </Button>
            }
          />
        </Grid>
        <Grid item xs={3}>
          <AverageAPYMocked
            withComingSoon
            title="DCA"
            value="15"
            icon={<CatsPaw variant="violet" className={classes.icon} />}
            button={
              <Button color="primary" variant="contained">
                DCA
              </Button>
            }
          />
        </Grid>
        <Grid item xs={3}>
          <AverageAPYMocked
            withComingSoon
            title="My Harvest"
            value="20"
            icon={<Fish className={classes.fishIcon} />}
          />
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
    icon: {
      fontSize: 50,
    },
    fishIcon: {
      fontSize: 90,
      height: 50,
    },
    startToSave: {
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
