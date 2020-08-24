import React from 'react';

import { useApi } from 'services/api';
import { useSubscribableDeprecated } from 'utils/react';
import { DeprecatedLoading, FormattedAmount } from 'components';

export function TotalRewardsBalance() {
  const api = useApi();
  const [totalBalance, meta] = useSubscribableDeprecated(() => api.user.getTotalRewardsBalance$(), [
    api,
  ]);
  return (
    <DeprecatedLoading meta={meta}>
      {totalBalance && <FormattedAmount sum={totalBalance} />}
    </DeprecatedLoading>
  );
}
