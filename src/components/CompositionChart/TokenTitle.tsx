import * as React from 'react';

import { makeStyles } from 'utils/styles';

import { TokenIcon } from '../TokenIcon';

type Props = {
  address: string;
  title: string;
};

export function TokenTitle(props: Props) {
  const { title, address } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TokenIcon tokenAddress={address} />
      <div className={classes.title}>{title}</div>
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      marginLeft: 10,
    },
  }),
  { name: 'TokenTitle' },
);
