import * as React from 'react';

import { Loading, Grid } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { Pool } from './Pool';

export function SavingsPollsList() {
  const api = useApi();
  const [pools, poolsMeta] = useSubscribable(() => api.savings.getPools$(), [api]);

  return (
    <Loading meta={poolsMeta}>
      <Grid container spacing={3}>
        {pools &&
          pools.map(pool => (
            <Grid key={pool.address} item xs={6}>
              <Pool {...pool} />
            </Grid>
          ))}
      </Grid>
    </Loading>
  );
}
