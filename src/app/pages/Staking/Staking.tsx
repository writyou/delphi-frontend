import React from 'react';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading, Grid } from 'components';

import { StakingPoolCard } from './StakingPoolCard';

export function Staking() {
  const api = useApi();
  const poolsRD = useSubscribable(() => api.staking.getPools$(), [api]);

  return (
    <Loading data={poolsRD}>
      {pools => (
        <Grid container alignItems="flex-start" spacing={6}>
          {pools.map(pool => (
            <Grid key={pool.address} item xs={4}>
              <StakingPoolCard pool={pool} />
            </Grid>
          ))}
        </Grid>
      )}
    </Loading>
  );
}
