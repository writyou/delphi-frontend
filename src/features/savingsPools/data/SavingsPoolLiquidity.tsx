import React from 'react';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function SavingsPoolLiquidity({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const [liquidity, liquidityMeta] = useSubscribable(
    () => api.savings.getPoolBalance$(poolAddress),
    [api, poolAddress],
  );

  return <Loading meta={liquidityMeta}>{liquidity && <FormattedAmount sum={liquidity} />}</Loading>;
}
