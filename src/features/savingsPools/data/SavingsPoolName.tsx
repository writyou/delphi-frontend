import React from 'react';

import { DeprecatedLoading } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';

export function SavingsPoolName({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const [pool, poolMeta] = useSubscribableDeprecated(() => api.savings.getPool$(poolAddress), [
    api,
    poolAddress,
  ]);

  return <DeprecatedLoading meta={poolMeta}>{pool && pool.poolName}</DeprecatedLoading>;
}
