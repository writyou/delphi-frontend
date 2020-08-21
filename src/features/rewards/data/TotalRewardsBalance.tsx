import React from 'react';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading, FormattedAmount } from 'components';

export function TotalRewardsBalance() {
  const api = useApi();
  const [totalBalance, meta] = useSubscribable(() => api.user.getTotalRewardsBalance$(), [api]);
  return <Loading meta={meta}>{totalBalance && <FormattedAmount sum={totalBalance} />}</Loading>;
}
