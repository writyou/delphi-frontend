import * as React from 'react';

import { makeStyles } from 'utils/styles';

import image from './investing-all-in@2x.png';

export function WithdrawTab() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={image} className={classes.contentMock} alt="pool-cards" />
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
    },
    contentMock: {
      width: '100%',
      height: '100%',
      maxHeight: 544,
      maxWidth: 1340,
    },
  }),
  { name: 'WithdrawTab' },
);
