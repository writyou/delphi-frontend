import * as React from 'react';
import { makeStyles } from '@akropolis-web/styles';

import { Metric, Typography } from 'components';
import { Cat1 } from 'components/icons';
import { UsersCount, TotalPoolsBalance } from 'features/globalStats';

export function LiveStats() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Live Stats</Typography>
      <div className={classes.metrics}>
        <div className={classes.metric}>
          <div className={classes.catImage}>
            <Cat1 fontSize="inherit" />
          </div>
          <Metric title="Active Members" size="small" value={<UsersCount />} />
        </div>
        <div className={classes.metric}>
          <Metric title="Total Value Locked" size="small" value={<TotalPoolsBalance />} />
        </div>
      </div>
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
      fontSize: 12,
      fontWeight: 300,
      opacity: 0.5,
    },
    metrics: {
      display: 'inline-flex',
      alignItems: 'inherit',
      marginLeft: 15,
    },
    metric: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      whiteSpace: 'nowrap',

      '& + &': {
        marginLeft: 30,
      },
    },
    catImage: {
      fontSize: 44,
      marginRight: 26,
    },
  }),
  { name: 'LiveStats' },
);
