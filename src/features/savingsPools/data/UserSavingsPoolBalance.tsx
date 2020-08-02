import React from 'react';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function UserSavingsPoolBalance({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const [balance, balanceMeta] = useSubscribable(
    () => api.user.getSavingsPoolBalance$(poolAddress),
    [api, poolAddress],
  );

  return (
    <Loading meta={balanceMeta}>
      {balance && <FormattedAmount sum={balance} variant="plain" />}
    </Loading>
  );
}
