import React from 'react';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading } from 'components';

import { SummaryPage } from './SummaryPage';
import { SummaryEmptyPage } from '../SummaryEmpty/SummaryEmptyPage';

export function Summary() {
  const api = useApi();
  const [user, userMeta] = useSubscribable(() => api.user.getUser$(), [api]);
  return <Loading meta={userMeta}>{user ? <SummaryPage /> : <SummaryEmptyPage />}</Loading>;
}
