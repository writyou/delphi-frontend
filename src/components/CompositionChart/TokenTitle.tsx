import * as React from 'react';

import { makeStyles } from 'utils/styles';

import { TokenIcon } from '../TokenIcon/TokenIcon';

type Props = {
  address: string;
  title: string;
};

export function TokenTitle(props: Props) {
  const { title, address } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <TokenIcon tokenAddress={address} />
      </div>
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
    icon: {},
  }),
  { name: 'TokenTitle' },
);
