import * as React from 'react';

import { Metric, Label, FormattedAmount } from 'components';
import { liquidityAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

export function TotalValueLocked() {
  const classes = useStyles();

  return (
    <Metric
      title={
        <span className={classes.title}>
          <Label withComingSoon>Total value locked</Label>
        </span>
      }
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 12,
  },
}));
