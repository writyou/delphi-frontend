import React from 'react';

import { FormattedAmount, Loading } from 'components';
import { percentAmount } from 'utils/mock';

export function UserStakingPoolsAvgAPY() {
  return (
    <Loading>
      <FormattedAmount sum={percentAmount} />
    </Loading>
  );
}
