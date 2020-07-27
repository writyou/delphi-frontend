import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { ComingSoon } from 'components';

import { AllInMock } from './AllInMock';

export function AllIn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AllInMock className={classes.contentMock} />
      <ComingSoon position="overlay" />
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
  { name: 'AllIn' },
);
