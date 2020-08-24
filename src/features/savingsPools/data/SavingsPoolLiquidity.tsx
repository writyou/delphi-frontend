import React from 'react';

import { FormattedAmount, FormattedAmountProps, Loading } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';

type Props = {
  poolAddress: string;
  variant?: FormattedAmountProps['variant'];
};

export function SavingsPoolLiquidity({ poolAddress, variant }: Props) {
  const api = useApi();
  const [liquidity, liquidityMeta] = useSubscribableDeprecated(
    () => api.savings.getPoolBalance$(poolAddress),
    [api, poolAddress],
  );

  return (
    <Loading meta={liquidityMeta}>
      {liquidity && <FormattedAmount sum={liquidity} variant={variant} />}
    </Loading>
  );
}
