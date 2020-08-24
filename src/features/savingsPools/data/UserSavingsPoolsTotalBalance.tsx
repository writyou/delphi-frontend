import React from 'react';
import * as R from 'ramda';
import { map } from 'rxjs/operators';

import { FormattedAmount, DeprecatedLoading } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';

export function UserSavingsPoolsTotalBalance() {
  const api = useApi();
  const [totalBalance, totalBalanceMeta] = useSubscribableDeprecated(
    () =>
      api.user
        .getAllSavingsPoolsBalances$()
        .pipe(map(balances => R.pluck('balance', balances).reduce((acc, cur) => acc.add(cur)))),
    [api],
  );

  return (
    <DeprecatedLoading meta={totalBalanceMeta}>
      {totalBalance && <FormattedAmount sum={totalBalance} variant="plain" />}
    </DeprecatedLoading>
  );
}
