import * as React from 'react';

import { makeStyles } from 'utils/styles';

type Props = {
  title: string;
  color: string;
};

export function PortfolioBalanceLegendItem(props: Props) {
  const { title, color } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.cycle} style={{ backgroundColor: color }} />
      <div className={classes.title}>{title}</div>
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 20,
    },
    title: {
      marginLeft: 10,
      fontWeight: 300,
      fontSize: 12,
    },
    cycle: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
  }),
  { name: 'PortfolioBalanceLegendItem' },
);
