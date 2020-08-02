import React from 'react';

import { Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function UsersCount() {
  const api = useApi();
  const [count, countMeta] = useSubscribable(() => api.globalStats.getUsersCount$(), [api]);

  return <Loading meta={countMeta}>{count}</Loading>;
}
