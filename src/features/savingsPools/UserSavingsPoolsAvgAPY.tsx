import React from 'react';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function UserSavingsPoolsAvgAPY() {
  const api = useApi();
  const [avgAPY, avgAPYMeta] = useSubscribable(() => api.user.getSavingsPoolsAvgAPY$(), [api]);

  return <Loading meta={avgAPYMeta}>{avgAPY && <FormattedAmount sum={avgAPY} />}</Loading>;
}
