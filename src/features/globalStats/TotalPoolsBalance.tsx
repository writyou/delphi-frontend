import React from 'react';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function TotalPoolsBalance() {
  const api = useApi();
  const balanceRD = useSubscribable(() => api.globalStats.getTotalPoolsBalance$(), [api]);

  return <Loading data={balanceRD}>{balance => <FormattedAmount sum={balance} />}</Loading>;
}
