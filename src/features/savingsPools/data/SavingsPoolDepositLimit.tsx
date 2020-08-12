import React from 'react';

import { Loading, DepositLimit } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function SavingsPoolDepositLimit({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const [limit, limitMeta] = useSubscribable(() => api.user.getSavingsDepositLimit$(poolAddress), [
    api,
    poolAddress,
  ]);

  return <Loading meta={limitMeta}>{limit && <DepositLimit limit={limit} />}</Loading>;
}
