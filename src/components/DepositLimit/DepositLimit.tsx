import React from 'react';
import Grid from '@material-ui/core/Grid';
import cn from 'classnames';
import { Amount } from '@akropolis-web/primitives';

import { makeStyles } from 'utils/styles';
import { FormattedAmount } from 'components/FormattedAmount/FormattedAmount';

export function DepositLimit({ limit }: { limit: Amount }) {
  const classes = useStyles();
  return (
    <Grid container alignItems="baseline">
      {limit.isZero() ? (
        <>
          <span className={classes.circle} /> Not Available for deposit
        </>
      ) : (
        <>
          <span className={cn(classes.circle, classes.active)} />
          Available for deposit:&nbsp;
          <FormattedAmount sum={limit} variant="plain" />
        </>
      )}
    </Grid>
  );
}
const useStyles = makeStyles(
  {
    circle: {
      width: '0.8em',
      height: '0.8em',
      backgroundColor: '#494a73',
      borderRadius: '0.4em',
      marginRight: '0.5em',

      '&$active': {
        backgroundColor: '#6bfe97',
      },
    },

    active: {},
  },
  {
    name: 'DepositLimit',
  },
);
