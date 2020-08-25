import * as React from 'react';

import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { DepositDCAPoolButton, ChangeDCAPoolButton } from 'features/DCAPools';
import { DCAPool } from 'model/types';
import { Grid, Loading } from 'components';

type Props = {
  pool: DCAPool;
};

export function DCADepositCardButtons({ pool }: Props) {
  const api = useApi();
  const balanceRD = useSubscribable(() => api.user.getDCAPoolBalance$(pool.address), [
    api,
    pool.address,
  ]);

  return (
    <Loading data={balanceRD}>
      {balance =>
        balance.isZero() ? (
          <DepositDCAPoolButton
            disabled
            size="small"
            color="primary"
            variant="outlined"
            pool={pool}
          />
        ) : (
          <Grid container spacing={1}>
            <Grid item>
              <ChangeDCAPoolButton
                disabled
                size="small"
                color="primary"
                variant="outlined"
                pool={pool}
              />
            </Grid>
            <Grid item>
              <DepositDCAPoolButton
                disabled
                size="small"
                color="primary"
                variant="outlined"
                pool={pool}
              />
            </Grid>
          </Grid>
        )
      }
    </Loading>
  );
}
