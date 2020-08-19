import React from 'react';

import { Loading, Label, PoolSummaryCard, GradientArrowButton } from 'components';
import { CatsPaw } from 'components/icons';
import { useSubscribable } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { useApi } from 'services/api';
import { routes } from 'app/routes';

import { UserSavingsPoolsBalancesComposition } from './UserSavingsPoolsBalancesComposition';
import { UserSavingsPoolsAvgAPY } from './UserSavingsPoolsAvgAPY';

export function UserSavingsPoolsSummary() {
  const api = useApi();
  const classes = useStyles();
  const [pools, poolsMeta] = useSubscribable(() => api.user.getMySavingsPools$(), [api]);

  const hasSavings = pools && pools.length;

  return (
    <Loading meta={poolsMeta}>
      <PoolSummaryCard
        title={<Label>Savings</Label>}
        chart={
          hasSavings ? (
            <UserSavingsPoolsBalancesComposition size="extra-small" />
          ) : (
            <CatsPaw className={classes.icon} />
          )
        }
        apyValue={<UserSavingsPoolsAvgAPY />}
        button={
          <GradientArrowButton to={routes.savings.getRedirectPath()}>Save</GradientArrowButton>
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
  { name: 'UserSavingsPoolsSummary' },
);
