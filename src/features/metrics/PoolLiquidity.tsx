import * as React from 'react';

import { Metric, Label, FormattedAmount } from 'components';
import { liquidityAmount } from 'utils/mock';

export function PoolLiquidity() {
  return (
    <Metric
      title={<Label>Pool Liquidity</Label>}
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}
