import React from 'react';

import { Loading } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';

export function SavingsPoolName({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const [pool, poolMeta] = useSubscribableDeprecated(() => api.savings.getPool$(poolAddress), [
    api,
    poolAddress,
  ]);

  return <Loading meta={poolMeta}>{pool && pool.poolName}</Loading>;
}
