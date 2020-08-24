import * as React from 'react';

import { Loading, FormattedAmount } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

export function MyTokenBalance({ address }: { address: string }) {
  const api = useApi();
  const balanceRD = useSubscribable(() => api.user.getTokenBalance$(address), [api, address]);

  return <Loading data={balanceRD}>{balance => <FormattedAmount sum={balance} />}</Loading>;
}
