import * as React from 'react';

import { Metric, Label, FormattedAmount } from 'components';
import { liquidityAmount } from 'utils/mock';

export function DailyTradeVolume() {
  return (
    <Metric
      title={<Label>Daily Trade Volume</Label>}
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}
