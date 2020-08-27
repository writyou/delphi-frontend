import React from 'react';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading, FormattedAmount } from 'components';

export function TotalRewardsBalance() {
  const api = useApi();
  const totalBalanceRD = useSubscribable(() => api.user.getTotalRewardsBalance$(), [api]);

  return (
    <Loading data={totalBalanceRD}>
      {totalBalance => <FormattedAmount sum={totalBalance} />}
    </Loading>
  );
}
