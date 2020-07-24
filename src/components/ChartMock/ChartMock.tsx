import * as React from 'react';

import { makeStyles } from 'utils/styles';

export function ChartMock() {
  const classes = useStyles();

  return <div className={classes.root} />;
}

const useStyles = makeStyles(
  () => ({
    root: {
      width: 48,
      height: 48,
      backgroundColor: 'red',
    },
  }),
  { name: 'ChartMock' },
);
