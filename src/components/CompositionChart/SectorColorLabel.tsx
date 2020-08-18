import * as React from 'react';

import { makeStyles } from 'utils/styles';

type Props = {
  title: React.ReactNode;
  color: string;
};

export function SectorColorLabel(props: Props) {
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
      display: 'inline-flex',
      alignItems: 'center',
    },
    title: {
      marginLeft: 10,
    },
    cycle: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
  }),
  { name: 'SectorColorLabel' },
);
