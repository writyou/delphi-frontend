import React from 'react';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function TotalPoolsBalance() {
  const api = useApi();
  const [balance, balanceMeta] = useSubscribable(() => api.globalStats.getTotalPoolsBalance$(), [
    api,
  ]);

  return <Loading meta={balanceMeta}>{balance && <FormattedAmount sum={balance} />}</Loading>;
}
