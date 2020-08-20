import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Label, PoolSummaryCard, GradientArrowButton } from 'components';
import { routes } from 'app/routes';
import { UserStakingPoolsBalancesComposition, UserStakingPoolsAvgAPY } from 'features/stakingPools';

export function UserStakingPoolsSummary() {
  return (
    <PoolSummaryCard
      title={<Label>Staking</Label>}
      chart={<UserStakingPoolsBalancesComposition size="extra-small" />}
      apyValue={<UserStakingPoolsAvgAPY />}
      button={
        <GradientArrowButton
          component={RouterLink}
          to={routes.staking.getRedirectPath()}
          id="stake"
        >
          Stake
        </GradientArrowButton>
      }
    />
  );
}
