import React from 'react';
import { PercentAmount } from '@akropolis-web/primitives';

import { FormattedAmount, Loading } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';
import { MAX_AVG_APY } from 'env';

export function UserSavingsPoolsAvgAPY() {
  const api = useApi();
  const [avgAPY, avgAPYMeta] = useSubscribableDeprecated(() => api.user.getSavingsPoolsAvgAPY$(), [
    api,
  ]);

  return (
    <Loading meta={avgAPYMeta}>
      {avgAPY && avgAPY.lt(MAX_AVG_APY) ? (
        <FormattedAmount sum={avgAPY} />
      ) : (
        <>
          &gt;&nbsp;
          <FormattedAmount sum={new PercentAmount(MAX_AVG_APY)} />
        </>
      )}
    </Loading>
  );
}
