import * as React from 'react';
import { LiquidityAmount, PercentAmount, Currency, Fraction } from '@akropolis-web/primitives';
import { Grid, Label } from '@akropolis-web/components';

import { makeStyles } from 'utils/styles';

import { FormattedAmount } from '../FormattedAmount/FormattedAmount';

const mockedData = {
  capacity: new LiquidityAmount('51313213213213213210', new Currency('$', 18)),
  availableForDeposit: new LiquidityAmount('11313213213213213210', new Currency('$', 18)),
  fillPercent: new PercentAmount(new Fraction('50')),
  isAvailable: true,
};

export function PoolFillingLimit() {
  const classes = useStyles();
  const { fillPercent, availableForDeposit, capacity, isAvailable } = mockedData;

  return (
    <Grid container direction="column" className={classes.root} spacing={1}>
      <Grid item container>
        <Grid item>
          Capacity: <FormattedAmount sum={capacity} variant="plain" />
        </Grid>
        <Grid item className={classes.percentFilled}>
          Filled: <FormattedAmount sum={fillPercent} variant="plain" />
          {renderProgressBar()}
        </Grid>
      </Grid>
      {renderAvailableToDeposit()}
    </Grid>
  );

  function renderProgressBar() {
    return (
      <div className={classes.progressBar}>
        <div className={classes.bar}>
          <div className={classes.filledValue} style={{ width: `${fillPercent}%` }} />
        </div>
      </div>
    );
  }
  function renderAvailableToDeposit() {
    return (
      <Grid item container alignItems="center">
        {renderCircle(isAvailable ? '#6bfe97' : '#494a73')}
        <Grid item className={classes.label}>
          <Label>{isAvailable ? 'Available for your deposit:' : 'Not available for deposit'}</Label>
        </Grid>
        {isAvailable && (
          <Grid item>
            <FormattedAmount sum={availableForDeposit} variant="plain" />
          </Grid>
        )}
      </Grid>
    );
  }

  function renderCircle(color: string) {
    return <div className={classes.circle} style={{ backgroundColor: color }} />;
  }
}

const useStyles = makeStyles(
  theme => ({
    root: {
      fontSize: 12,
    },
    percentFilled: {
      marginLeft: 42,
    },
    label: {
      marginLeft: 6,
      marginRight: 3,
    },
    circle: {
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    progressBar: {
      display: 'inline-flex',
      marginLeft: 6,
    },
    bar: {
      position: 'relative',
      width: 38,
      height: 4,
      background: theme.palette.background.default,
      borderRadius: 2,
    },
    filledValue: {
      position: 'absolute',
      top: '50%',
      left: 0,
      height: 6,
      borderRadius: 4,
      transform: 'translateY(-50%)',
      background: 'linear-gradient(to bottom, #c6b0ff, #9360ff)',
    },
  }),
  { name: 'PoolFillingLimit' },
);
