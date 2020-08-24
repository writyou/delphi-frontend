import React from 'react';

import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { Loading } from 'components';

export function UsersCount() {
  const api = useApi();
  const stats = useSubscribable(() => api.globalStats.getStats$(), [api]);

  return (
    <Loading data={stats}>{({ activeMembersCount }) => <div>{activeMembersCount}</div>}</Loading>
  );
}
