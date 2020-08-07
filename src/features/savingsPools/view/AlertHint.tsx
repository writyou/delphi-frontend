import React from 'react';

import { makeStyles } from 'utils/styles';
import { Hint, Typography } from 'components';
import { AlertIcon } from 'components/icons';

export function AlertHint() {
  const classes = useStyles();

  return (
    <Hint>
      <AlertIcon />
      <Typography className={classes.hint} align="left">
        {`Please note that you're withdrawing from Balancer liquidity pool, 
        [something may occur]`}
      </Typography>
    </Hint>
  );
}

const useStyles = makeStyles(
  () => ({
    hint: {
      marginLeft: 10,
    },
  }),
  { name: 'AlertHint' },
);
