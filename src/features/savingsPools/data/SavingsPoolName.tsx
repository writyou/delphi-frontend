import React from 'react';

import { Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function SavingsPoolName({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const poolRD = useSubscribable(() => api.savings.getPool$(poolAddress), [api, poolAddress]);

  return (
    <Loading data={poolRD}>
      {pool => <>{pool ? pool.poolName : 'Got no name after loading'}</>}
    </Loading>
  );
}
