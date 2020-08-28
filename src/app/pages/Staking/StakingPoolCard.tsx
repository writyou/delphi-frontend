import React from 'react';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as R from 'ramda';

import { useApi } from 'services/api';
import { PoolCard, Grid, Loading, DepositLimit, PoolFillingLimit } from 'components';
import { StakingPool } from 'model/types';
import {
  StakingPoolLiquidity,
  UserStakingPoolBalance,
  WithdrawFromStakingPoolButton,
  DepositToStakingPoolButton,
} from 'features/stakingPools';
import { useSubscribable } from 'utils/react';

type Props = {
  pool: StakingPool;
};

export function StakingPoolCard({ pool }: Props) {
  const { address, poolName, token } = pool;
  const api = useApi();

  const isCardActive = useSubscribable(() => api.user.getFullStakingPoolBalance$(address), [
    api,
    address,
  ])
    .map(balance => !balance.isZero())
    .getOrElse(R.F);

  return (
    <PoolCard
      poolName={poolName}
      tokens={[token]}
      isCardActive={isCardActive}
      content={{
        suppliedByUser: {
          content: <UserStakingPoolBalance poolAddress={address} />,
          customTitle: 'My Stake',
        },
        poolLiquidity: {
          content: <StakingPoolLiquidity poolAddress={address} />,
          customTitle: 'Staked overall',
        },
        availableForDeposit: <AvailableForDeposit poolAddress={address} />,
        poolFilling: <PoolFilling poolAddress={address} />,
        actions: {
          triggers: (
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
          ),
        },
      }}
    />
  );
}

function AvailableForDeposit(props: { poolAddress: string }) {
  const { poolAddress } = props;
  const api = useApi();
  const availableForDepositRD = useSubscribable(
    () => api.user.getStakingDepositLimit$(poolAddress),
    [api, poolAddress],
  );

  return (
    <Loading data={availableForDepositRD} progressProps={{ width: '100%' }}>
      {availableForDeposit => availableForDeposit && <DepositLimit limit={availableForDeposit} />}
    </Loading>
  );
}

function PoolFilling(props: { poolAddress: string }) {
  const { poolAddress } = props;
  const api = useApi();

  const poolFillingRD = useSubscribable(
    () =>
      combineLatest([
        api.staking.getPoolBalance$(poolAddress),
        api.staking.getPoolCapacity$(poolAddress),
      ]).pipe(
        map(([poolBalance, poolCapacity]) => ({
          poolBalance,
          poolCapacity,
        })),
      ),
    [api, poolAddress],
  );

  return (
    <Loading data={poolFillingRD} progressProps={{ width: '100%' }}>
      {poolFilling =>
        poolFilling.poolCapacity && (
          <PoolFillingLimit capacity={poolFilling.poolCapacity} filled={poolFilling.poolBalance} />
        )
      }
    </Loading>
  );
}
