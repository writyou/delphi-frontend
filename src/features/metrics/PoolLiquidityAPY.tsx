import * as React from 'react';

import { Metric, Label, FormattedAmount, ChartProfit, Grid } from 'components';
import { percentAmount } from 'utils/mock';

export function PoolLiquidityAPY() {
  return (
    <Metric
      title={<Label>APY</Label>}
      value={<FormattedAmount sum={percentAmount} />}
      subValue={
        <Grid container>
          <ChartProfit variant="increase" value="7.50" sign="+" />
          <div style={{ width: 44, height: 18, backgroundColor: 'red', marginLeft: 7 }} />
        </Grid>
      }
    />
  );
}
