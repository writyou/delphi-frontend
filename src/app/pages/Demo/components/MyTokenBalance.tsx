import * as React from 'react';

import { DeprecatedLoading, FormattedAmount } from 'components';
import { useApi } from 'services/api';
import { useSubscribableDeprecated } from 'utils/react';

export function MyTokenBalance({ address }: { address: string }) {
  const api = useApi();
  const [balance, balanceMeta] = useSubscribableDeprecated(
    () => api.user.getTokenBalance$(address),
    [api, address],
  );

  return (
    <DeprecatedLoading meta={balanceMeta}>
      {balance && <FormattedAmount sum={balance} />}
    </DeprecatedLoading>
  );
}
