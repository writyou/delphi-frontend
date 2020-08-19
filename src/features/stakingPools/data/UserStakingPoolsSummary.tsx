import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Loading, Label, PoolSummaryCard, GradientArrowButton } from 'components';
import { CatsPaw } from 'components/icons';
import { useSubscribable } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { useApi } from 'services/api';
import { routes } from 'app/routes';

import { UserStakingPoolsBalancesComposition } from './UserStakingPoolsBalancesComposition';
import { UserStakingPoolsAvgAPY } from './UserStakingPoolsAvgAPY';

export function UserStakingPoolsSummary() {
  const api = useApi();
  const classes = useStyles();
  const [pools, poolsMeta] = useSubscribable(() => api.user.getMyStakingPools$(), [api]);

  const hasStaking = pools && pools.length;

  return (
    <Loading meta={poolsMeta}>
      <PoolSummaryCard
        title={<Label>Staking</Label>}
        chart={
          hasStaking ? (
            <UserStakingPoolsBalancesComposition size="extra-small" />
          ) : (
            <CatsPaw variant="lilac" className={classes.icon} />
          )
        }
        apyValue={<UserStakingPoolsAvgAPY />}
        button={
          <GradientArrowButton component={RouterLink} to={routes.staking.getRedirectPath()}>
            Stake
          </GradientArrowButton>
        }
      />
    </Loading>
  );
}

const useStyles = makeStyles(
  () => ({
    icon: {
      fontSize: 50,
    },
  }),
  { name: 'UserStakingPoolsSummary' },
);
