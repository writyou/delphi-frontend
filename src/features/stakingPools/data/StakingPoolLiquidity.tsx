import React from 'react';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function StakingPoolLiquidity({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const liquidityRD = useSubscribable(() => api.staking.getPoolBalance$(poolAddress), [
    api,
    poolAddress,
  ]);

  return (
    <Loading data={liquidityRD}>
      {liquidity => <FormattedAmount sum={liquidity} variant="plain" />}
    </Loading>
  );
}
