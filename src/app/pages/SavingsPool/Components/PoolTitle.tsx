import * as React from 'react';

import { TokenIcon } from 'components';
import { makeStyles } from 'utils/styles';

type Props = {
  title: string;
};

export function PoolTitle(props: Props) {
  const { title } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <TokenIcon tokenAddress={title} />
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
  { name: 'PoolTitle' },
);
