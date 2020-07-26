import * as React from 'react';

import { Metric, Label, FormattedAmount } from 'components';
import { percentAmount } from 'utils/mock';

export function PoolSwapFee() {
  return (
    <Metric title={<Label>Pool Swap Fee</Label>} value={<FormattedAmount sum={percentAmount} />} />
  );
}
