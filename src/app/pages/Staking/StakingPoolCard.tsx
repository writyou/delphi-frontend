import React, { useCallback } from 'react';

import { useApi } from 'services/api';
import { PoolCard, Grid } from 'components';
import { StakingPool } from 'model/types';
import {
  StakingPoolLiquidity,
  UserStakingPoolBalance,
  WithdrawFromStakingPoolButton,
  DepositToStakingPoolButton,
} from 'features/stakingPools';

type Props = {
  pool: StakingPool;
};

export function StakingPoolCard({ pool }: Props) {
  const { address, poolName, token } = pool;
  const api = useApi();

  return (
    <PoolCard
      address={address}
      poolName={poolName}
      tokens={[token]}
      content={
        <Grid container spacing={1}>
          <Grid item>
            <DepositToStakingPoolButton
              size="small"
              color="primary"
              variant="outlined"
              pool={pool}
            />
          </Grid>
          <Grid item>
            <WithdrawFromStakingPoolButton
              size="small"
              color="primary"
              variant="outlined"
              pool={pool}
            />
          </Grid>
        </Grid>
      }
      poolBalance={<UserStakingPoolBalance poolAddress={address} />}
      poolBalanceTitle="My Stake"
      poolLiquidity={<StakingPoolLiquidity poolAddress={address} />}
      poolLiquidityTitle="Staked overall"
      getDepositLimit$={useCallback(() => api.user.getStakingDepositLimit$(pool.address), [])}
      getUserBalance$={useCallback((s: string) => api.user.getFullStakingPoolBalance$(s), [])}
      getPoolBalance$={useCallback((s: string) => api.staking.getPoolBalance$(s), [])}
      getPoolCapacity$={useCallback((s: string) => api.staking.getPoolCapacity$(s), [])}
    />
  );
}
