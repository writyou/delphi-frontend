import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Label, PoolSummaryCard, GradientArrowButton } from 'components';
import { routes } from 'app/routes';
import { UserStakingPoolsBalancesComposition, UserStakingPoolsAvgAPY } from 'features/stakingPools';
import { useBreakpointsMatch } from 'services/adaptability';

export function UserStakingPoolsSummary() {
  const isMobile = useBreakpointsMatch({ to: 'tabletXS' });

  return (
    <PoolSummaryCard
      title={<Label>Staking</Label>}
      chart={
        <UserStakingPoolsBalancesComposition size={isMobile ? 'ultra-small' : 'extra-small'} />
      }
      apyValue={<UserStakingPoolsAvgAPY />}
      button={
        <GradientArrowButton component={RouterLink} to={routes.staking.getRedirectPath()}>
          Stake
        </GradientArrowButton>
      }
    />
  );
}
