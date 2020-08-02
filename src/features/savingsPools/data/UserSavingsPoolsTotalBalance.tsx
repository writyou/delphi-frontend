import React from 'react';
import * as R from 'ramda';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function UserSavingsPoolsTotalBalance() {
  const api = useApi();
  const [balances, balancesMeta] = useSubscribable(() => api.user.getAllSavingsPoolsBalances$(), [
    api,
  ]);
  const totalBalance = balances && R.pluck('balance', balances).reduce((acc, cur) => acc.add(cur));

  return (
    <Loading meta={balancesMeta}>
      {totalBalance && <FormattedAmount sum={totalBalance} variant="plain" />}
    </Loading>
  );
}
