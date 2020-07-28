import * as React from 'react';

import { Metric, Label, FormattedAmount } from 'components';
import { percentAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

export function PoolSwapFee() {
  const classes = useStyles();

  return (
    <Metric
      title={
        <div className={classes.title}>
          <Label>Pool Swap Fee</Label>
        </div>
      }
      value={<FormattedAmount sum={percentAmount} />}
    />
  );
}

const useStyles = makeStyles(
  () => ({
    title: {
      marginBottom: 15,
    },
  }),
  { name: 'PoolSwapFee' },
);
