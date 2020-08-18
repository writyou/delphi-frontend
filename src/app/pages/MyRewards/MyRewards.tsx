import * as React from 'react';

import { ComingSoon, Card } from 'components';
import { makeStyles } from 'utils/styles';

export function MyRewards() {
  const classes = useStyles();

  return (
    <Card variant="contained" className={classes.root}>
      <ComingSoon variant="label" />
    </Card>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: 50,
      minHeight: '100%',
    },
  }),
  { name: 'MyRewards' },
);
