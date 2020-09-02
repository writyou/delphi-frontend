import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Label, PoolSummaryCard, GradientArrowButton } from 'components';
import { routes } from 'app/routes';
import { UserSavingsPoolsBalancesComposition, UserSavingsPoolsAvgAPY } from 'features/savingsPools';
import { useBreakpointsMatch } from 'services/adaptability';

export function UserSavingsPoolsSummary() {
  const isMobile = useBreakpointsMatch({ to: 'tabletXS' });

  return (
    <PoolSummaryCard
      title={<Label>Savings</Label>}
      chart={
        <UserSavingsPoolsBalancesComposition size={isMobile ? 'ultra-small' : 'extra-small'} />
      }
      apyValue={<UserSavingsPoolsAvgAPY />}
      button={
        <GradientArrowButton component={RouterLink} to={routes.savings.getRedirectPath()}>
          Save
        </GradientArrowButton>
      }
    />
  );
}
