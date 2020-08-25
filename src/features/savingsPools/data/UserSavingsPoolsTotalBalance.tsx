import React from 'react';
import * as R from 'ramda';
import { map } from 'rxjs/operators';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function UserSavingsPoolsTotalBalance() {
  const api = useApi();
  const totalBalanceRD = useSubscribable(
    () =>
      api.user
        .getAllSavingsPoolsBalances$()
        .pipe(map(balances => R.pluck('balance', balances).reduce((acc, cur) => acc.add(cur)))),
    [api],
  );

  return (
    <Loading data={totalBalanceRD}>
      {totalBalance => <FormattedAmount sum={totalBalance} variant="plain" />}
    </Loading>
  );
}
