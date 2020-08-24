import React from 'react';

import { FormattedAmount, Loading } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';

export function UserDCAPoolBalance({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const [balance, balanceMeta] = useSubscribableDeprecated(
    () => api.user.getDCAPoolBalance$(poolAddress),
    [api, poolAddress],
  );

  return (
    <Loading meta={balanceMeta}>
      {balance && <FormattedAmount sum={balance} variant="plain" />}
    </Loading>
  );
}
