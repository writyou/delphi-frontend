import React from 'react';

import { FormattedAmount, DeprecatedLoading } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';

export function TotalPoolsBalance() {
  const api = useApi();
  const [balance, balanceMeta] = useSubscribableDeprecated(
    () => api.globalStats.getTotalPoolsBalance$(),
    [api],
  );

  return (
    <DeprecatedLoading meta={balanceMeta}>
      {balance && <FormattedAmount sum={balance} />}
    </DeprecatedLoading>
  );
}
