import React from 'react';

import { makeStyles } from 'utils/styles';
import { Card } from 'components';

export function Settings() {
  const classes = useStyles();

  return (
    <Card variant="contained" className={classes.root}>
      Settings Page
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
  { name: 'Settings' },
);
