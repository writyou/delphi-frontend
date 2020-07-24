import * as React from 'react';

import { makeStyles } from 'utils/styles';

export function PoolIcon() {
  const classes = useStyles();

  return <div className={classes.root} />;
}

const useStyles = makeStyles(
  () => ({
    root: {
      width: 10,
      height: 10,
      backgroundColor: 'red',
    },
  }),
  { name: 'PoolIcon' },
);
