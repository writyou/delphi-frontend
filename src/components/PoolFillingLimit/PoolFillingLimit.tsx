import * as React from 'react';
import { Amount, PercentAmount } from '@akropolis-web/primitives';
import { Grid } from '@akropolis-web/components';

import { makeStyles } from 'utils/styles';

import { FormattedAmount } from '../FormattedAmount/FormattedAmount';

type Props = {
  capacity: Amount;
  filled: Amount;
};

const MAX_PERCENT = new PercentAmount(100);

export function PoolFillingLimit(props: Props) {
  const classes = useStyles();
  const { filled, capacity } = props;

  const fillPercent = capacity.isZero()
    ? new PercentAmount(0)
    : new PercentAmount(filled).div(capacity).mul(100);
  const roundedPercent = fillPercent.gt(MAX_PERCENT) ? MAX_PERCENT : fillPercent;

  return (
    <Grid container justify="space-between" className={classes.root} spacing={1}>
      <Grid item>
        Capacity: <FormattedAmount sum={capacity} variant="plain" hideSymbol />
      </Grid>
      {!capacity.isZero() && (
        <Grid item>
          Filled: <FormattedAmount sum={roundedPercent} variant="plain" />
          {renderProgressBar()}
        </Grid>
      )}
    </Grid>
  );

  function renderProgressBar() {
    return (
      <div className={classes.progressBar}>
        <div className={classes.bar}>
          <div className={classes.filledValue} style={{ width: `${roundedPercent}%` }} />
        </div>
      </div>
    );
  }
}

const useStyles = makeStyles(
  theme => ({
    root: {
      fontSize: 12,
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
