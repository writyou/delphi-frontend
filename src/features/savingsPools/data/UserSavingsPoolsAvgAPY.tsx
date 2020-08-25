import React from 'react';
import { PercentAmount } from '@akropolis-web/primitives';

import { FormattedAmount, Loading, Box } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { MAX_AVG_APY } from 'env';

export function UserSavingsPoolsAvgAPY() {
  const api = useApi();
  const avgAPYRD = useSubscribable(() => api.user.getSavingsPoolsAvgAPY$(), [api]);

  return (
    <Loading data={avgAPYRD}>
      {avgAPY =>
        avgAPY.lt(MAX_AVG_APY) ? (
          <FormattedAmount sum={avgAPY} />
        ) : (
          <Box component="span" whiteSpace="nowrap">
            &gt;&nbsp;
            <FormattedAmount sum={new PercentAmount(MAX_AVG_APY)} />
          </Box>
        )
      }
    </Loading>
  );
}
