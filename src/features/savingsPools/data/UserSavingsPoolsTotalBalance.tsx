import React from 'react';
import * as R from 'ramda';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

export function UserSavingsPoolsTotalBalance() {
  const api = useApi();
  const [totalBalance, totalBalanceMeta] = useSubscribable(
    () =>
      api.user
        .getAllSavingsPoolsBalances$()
        .pipe(
          switchMap(balances =>
            of(R.pluck('balance', balances).reduce((acc, cur) => acc.add(cur))),
          ),
        ),
    [api],
  );

  return (
    <Loading meta={totalBalanceMeta}>
      {totalBalance && <FormattedAmount sum={totalBalance} variant="plain" />}
    </Loading>
  );
}
