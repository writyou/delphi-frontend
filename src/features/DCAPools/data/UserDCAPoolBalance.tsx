import React from 'react';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function UserDCAPoolBalance({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const balanceRD = useSubscribable(() => api.user.getDCAPoolBalance$(poolAddress), [
    api,
    poolAddress,
  ]);

  return (
    <Loading data={balanceRD}>
      {balance => <FormattedAmount sum={balance} variant="plain" />}
    </Loading>
  );
}
