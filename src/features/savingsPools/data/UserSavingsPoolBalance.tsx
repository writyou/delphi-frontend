import React from 'react';

import { FormattedAmount, DeprecatedLoading } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';

export function UserSavingsPoolBalance({ poolAddress }: { poolAddress: string }) {
  const api = useApi();
  const [balance, balanceMeta] = useSubscribableDeprecated(
    () => api.user.getSavingsPoolBalance$(poolAddress),
    [api, poolAddress],
  );

  return (
    <DeprecatedLoading meta={balanceMeta}>
      {balance && <FormattedAmount sum={balance} variant="plain" />}
    </DeprecatedLoading>
  );
}
