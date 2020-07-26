import * as React from 'react';

import { Metric, Label, FormattedAmount } from 'components';
import { liquidityAmount } from 'utils/mock';

export function MySupplyBalance() {
  return (
    <Metric
      title={<Label>My Supply Balance</Label>}
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}
