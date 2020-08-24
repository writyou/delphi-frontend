import React from 'react';

import { useApi } from 'services/api';
import { useSubscribableDeprecated } from 'utils/react';
import { DeprecatedLoading, Grid } from 'components';

import { StakingPoolCard } from './StakingPoolCard';

export function Staking() {
  const api = useApi();
  const [pools, poolsMeta] = useSubscribableDeprecated(() => api.staking.getPools$(), [api]);

  return (
    <DeprecatedLoading meta={poolsMeta}>
      <Grid container alignItems="flex-start" spacing={3}>
        {pools &&
          pools.length &&
          pools.map(pool => (
            <Grid key={pool.address} item xs={4}>
              <StakingPoolCard pool={pool} />
            </Grid>
          ))}
      </Grid>
    </DeprecatedLoading>
  );
}
