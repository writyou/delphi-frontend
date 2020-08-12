import * as React from 'react';

import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { WithdrawFromDCAPoolButton, DCAOutButton } from 'features/DCAPools';
import { DCAPool } from 'model/types';
import { Grid } from 'components';

type Props = {
  pool: DCAPool;
};

export function DCAWithdrawCardButtons({ pool }: Props) {
  const api = useApi();
  const [balance] = useSubscribable(() => api.user.getDCAPoolBalance$(pool.address), [
    api,
    pool.address,
  ]);

  if (balance && !balance.isZero()) {
    return (
      <Grid container spacing={1}>
        <Grid item>
          <WithdrawFromDCAPoolButton
            disabled
            size="small"
            color="primary"
            variant="outlined"
            pool={pool}
          />
        </Grid>
        <Grid item>
          <DCAOutButton disabled size="small" color="primary" variant="outlined" pool={pool} />
        </Grid>
      </Grid>
    );
  }
  return (
    <WithdrawFromDCAPoolButton
      disabled
      size="small"
      color="primary"
      variant="outlined"
      pool={pool}
    />
  );
}
