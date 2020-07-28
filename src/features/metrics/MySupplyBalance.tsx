import * as React from 'react';

import { Metric, Label, FormattedAmount } from 'components';
import { liquidityAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

export function MySupplyBalance() {
  const classes = useStyles();
  return (
    <Metric
      title={
        <div className={classes.title}>
          <Label>My Supply Balance</Label>
        </div>
      }
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}

const useStyles = makeStyles(
  () => ({
    title: {
      marginBottom: 15,
    },
  }),
  { name: 'MySupplyBalance' },
);
