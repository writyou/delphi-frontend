import React from 'react';
import { useRouteMatch } from 'react-router';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';
import { Back } from 'components/icons';
import { Button, Grid, FormTemplate, SwitchInputField } from 'components';
import {
  PoolLiquidity,
  PoolLiquidityAPY,
  DailyTradeVolume,
  PoolSwapFee,
  MySupplyBalance,
} from 'features/metrics';

import { PoolPieChart } from './Components/PoolPieChart';

const mockSectors = [
  {
    value: 10,
    currency: 31654654364,
    label: 'RSV',
  },
  {
    value: 30,
    currency: 31654654364,
    label: 'DAI',
  },
  {
    value: 20,
    currency: 5465468498,
    label: 'USDT',
  },
  {
    value: 10,
    currency: 316654364,
    label: 'TUSD',
  },
  {
    value: 30,
    currency: 516516,
    label: 'USDC',
  },
];

export function PoolSavingsPage() {
  const match = useRouteMatch<{ id: string }>('/savings/:id');
  const id = match ? match.params.id : null;

  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Back />
            <div className={classes.poolTitle}>{id}</div>
          </Grid>
        </Grid>
        <Grid item>
          <Button color="primary" variant="outlined">
            Withdraw
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.row}>
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
      <Grid container className={cn(classes.withBorder, classes.row)}>
        <Grid container item xs={6} className={classes.paddingRight}>
          Approximate Reward Weekly
          <PoolPieChart sectors={mockSectors} />
        </Grid>
        <Grid container item xs={4}>
          Currency Reserves
          <PoolPieChart sectors={mockSectors} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <MySupplyBalance />
        </Grid>
        <Grid item xs={6}>
          {renderForm()}
        </Grid>
      </Grid>
    </Grid>
  );

  function renderForm() {
    return (
      <FormTemplate onSubmit={() => undefined} onCancel={() => undefined}>
        <Grid container direction="column">
          <Grid item className={classes.allocateTitle}>
            Allocate
          </Grid>
          <Grid container item>
            <Grid item xs={8}>
              Token input
            </Grid>
            <Grid item xs={4}>
              <Grid container justify="flex-end">
                <SwitchInputField
                  name="InfiniteUnlock"
                  label="Infinite unlock"
                  helperText="Infinite unlock"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item className={classes.row}>
            <Grid item xs={8}>
              Estimated Gas Price
            </Grid>
            <Grid item xs={4}>
              <Grid container justify="flex-end">
                <Button color="primary" variant="contained">
                  Allocate
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormTemplate>
    );
  }
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
      marginBottom: 30,
    },
    row: {
      paddingTop: 50,
    },
    allocateTitle: {
      marginBottom: 20,
    },
  }),
  { name: 'PoolSavingsPage' },
);
