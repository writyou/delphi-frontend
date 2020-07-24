import * as React from 'react';

import { makeStyles } from 'utils/styles';

type Props = {
  title: string;
  fullTitle?: string;
};

export function PoolTitle(props: Props) {
  const { title, fullTitle } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.title}>{title}</p>
      {fullTitle && <p className={classes.fullTitle}>{fullTitle}</p>}
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      minWidth: 200,
    },
    title: {
      margin: 0,
    },
    fullTitle: {
      margin: 0,
      fontSize: 12,
    },
  }),
  { name: 'PoolTitle' },
);
