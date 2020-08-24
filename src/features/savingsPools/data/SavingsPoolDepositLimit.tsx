import React from 'react';

import { DeprecatedLoading, DepositLimit } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';

export function SavingsPoolDepositLimit({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const [limit, limitMeta] = useSubscribableDeprecated(
    () => api.user.getSavingsDepositLimit$(poolAddress),
    [api, poolAddress],
  );

  return (
    <DeprecatedLoading meta={limitMeta}>
      {limit && <DepositLimit limit={limit} />}
    </DeprecatedLoading>
  );
}
