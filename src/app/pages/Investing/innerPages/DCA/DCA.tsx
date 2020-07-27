import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { ComingSoon } from 'components';

import './investing-dca@2x.png';

export function DCA() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src="/images/investing-dca@2x.png" className={classes.contentMock} alt="dca" />
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
  { name: 'DCA' },
);
