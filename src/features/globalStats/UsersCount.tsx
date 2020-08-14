import React from 'react';

import { Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function UsersCount() {
  const api = useApi();
  const [stats, statsMeta] = useSubscribable(() => api.globalStats.getStats$(), [api]);

  return <Loading meta={statsMeta}>{stats?.activeMembersCount}</Loading>;
}
