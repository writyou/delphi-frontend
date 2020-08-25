import React from 'react';

import { FormattedAmount, FormattedAmountProps, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

type Props = {
  poolAddress: string;
  variant?: FormattedAmountProps['variant'];
};

export function SavingsPoolLiquidity({ poolAddress, variant }: Props) {
  const api = useApi();
  const liquidityRD = useSubscribable(() => api.savings.getPoolBalance$(poolAddress), [
    api,
    poolAddress,
  ]);

  return (
    <Loading data={liquidityRD}>
      {liquidity => <FormattedAmount sum={liquidity} variant={variant} />}
    </Loading>
  );
}
