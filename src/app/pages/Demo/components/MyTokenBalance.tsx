import * as React from 'react';

import { Loading, FormattedAmount } from 'components';
import { useApi } from 'services/api';
import { useSubscribableDeprecated } from 'utils/react';

export function MyTokenBalance({ address }: { address: string }) {
  const api = useApi();
  const [balance, balanceMeta] = useSubscribableDeprecated(
    () => api.user.getTokenBalance$(address),
    [api, address],
  );

  return <Loading meta={balanceMeta}>{balance && <FormattedAmount sum={balance} />}</Loading>;
}
