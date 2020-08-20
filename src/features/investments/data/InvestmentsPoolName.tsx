import React from 'react';

import { Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function InvestmentsPoolName({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const [pool, poolMeta] = useSubscribable(() => api.investments.getPool$(poolAddress), [
    api,
    poolAddress,
  ]);

  return <Loading meta={poolMeta}>{pool && pool.poolName}</Loading>;
}
