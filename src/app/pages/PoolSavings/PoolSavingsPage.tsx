import React from 'react';
import { useRouteMatch } from 'react-router';

import { makeStyles } from 'utils/styles';
import { Back } from 'components/icons';
import { Button, Grid } from 'components';
import {
  PoolLiquidity,
  PoolLiquidityAPY,
  DailyTradeVolume,
  PoolSwapFee,
  MySupplyBalance,
} from 'features/metrics';
import { mockSectors } from 'utils/mock';

import { PieChart } from './Components/PieChart';

export function PoolSavingsPage() {
  const match = useRouteMatch<{ id: string }>('/savings/:id');
  const id = match ? match.params.id : null;

  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container justify="space-between">
        <Grid item>
          <Grid container alignItems="center">
            <Back />
            <div className={classes.poolTitle}>{id}</div>
          </Grid>
        </Grid>
        <Grid item>
          <Button color="default" variant="outlined">
            Withdraw
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6} className={classes.paddingRight}>
          <Grid container justify="space-between">
            <PoolLiquidity />
            <PoolLiquidityAPY />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container justify="space-between">
            <DailyTradeVolume />
            <PoolSwapFee />
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.withBorder}>
        <Grid item xs={6} className={classes.paddingRight}>
          Approximate Reward Weekly
          <PieChart sectors={mockSectors} />
        </Grid>
        <Grid item xs={4}>
          Currency Reserves
          <PieChart sectors={mockSectors} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <MySupplyBalance />
        </Grid>
        <Grid item xs={4}>
          allocate
        </Grid>
        <Grid item xs={2}>
          <Grid container justify="flex-end">
            <Button color="primary" variant="contained">
              Allocate
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: '30px 50px',
    },
    poolTitle: {
      color: 'white',
      borderRadius: 11,
      backgroundImage: 'linear-gradient(to right, #6a2dba 0%, #6e34ce 100%)',
      padding: '0 10px',
      marginLeft: 35,
    },
    paddingRight: {
      paddingRight: 163,
    },
    withBorder: {
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: 45,
    },
  }),
  { name: 'PoolSavingsPage' },
);
