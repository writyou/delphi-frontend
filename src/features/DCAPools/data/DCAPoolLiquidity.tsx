import React from 'react';

import { FormattedAmount, DeprecatedLoading } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';

export function DCAPoolLiquidity({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const [liquidity, liquidityMeta] = useSubscribableDeprecated(
    () => api.dca.getPoolBalance$(poolAddress),
    [api, poolAddress],
  );

  return (
    <DeprecatedLoading meta={liquidityMeta}>
      {liquidity && <FormattedAmount sum={liquidity} variant="plain" />}
    </DeprecatedLoading>
  );
}
