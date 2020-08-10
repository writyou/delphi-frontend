import React from 'react';

import { useApi } from 'services/api';
import { PoolCard, Grid } from 'components';
import { StakingPool } from 'model/types';
import {
  StakingPoolLiquidity,
  UserStakingPoolBalance,
  WithdrawFromStakingPoolButton,
  DepositToStakingPoolButton,
} from 'features/stakingPools';
import { tokenAmount } from 'utils/mock';

type Props = {
  pool: StakingPool;
};

export function StakingPoolCard({ pool }: Props) {
  const { address, poolName, tokens } = pool;
  const api = useApi();
  return (
    <PoolCard
      address={address}
      poolName={poolName}
      tokens={tokens}
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
      availableForDeposit={tokenAmount}
      poolBalance={<UserStakingPoolBalance poolAddress={address} />}
      poolLiquidity={<StakingPoolLiquidity poolAddress={address} />}
      getUserBalance={(s: string) => api.user.getStakingPoolBalance$(s)}
    />
  );
}
