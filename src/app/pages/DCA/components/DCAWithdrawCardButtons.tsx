import * as React from 'react';

import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { WithdrawFromDCAPoolButton, DCAOutButton } from 'features/DCAPools';
import { DCAPool } from 'model/types';
import { Grid, Loading } from 'components';

type Props = {
  pool: DCAPool;
};

export function DCAWithdrawCardButtons({ pool }: Props) {
  const api = useApi();
  const balanceRD = useSubscribable(() => api.user.getDCAPoolBalance$(pool.address), [
    api,
    pool.address,
  ]);

  return (
    <Loading data={balanceRD}>
      {balance =>
        balance.isZero() ? (
          <WithdrawFromDCAPoolButton
            disabled
            size="small"
            color="primary"
            variant="outlined"
            pool={pool}
          />
        ) : (
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
        )
      }
    </Loading>
  );
}
