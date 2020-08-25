import React from 'react';

import { FormattedAmount, DeprecatedLoading } from 'components';
import { percentAmount } from 'utils/mock';

export function UserStakingPoolsAvgAPY() {
  return (
    <DeprecatedLoading>
      <FormattedAmount sum={percentAmount} />
    </DeprecatedLoading>
  );
}
