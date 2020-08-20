import React from 'react';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function UserInvestmentsPoolsAvgAPY() {
  const api = useApi();
  const [avgAPY, avgAPYMeta] = useSubscribable(() => api.user.getInvestmentsPoolsAvgAPY$(), [api]);

  return <Loading meta={avgAPYMeta}>{avgAPY && <FormattedAmount sum={avgAPY} />}</Loading>;
}
