import React, { useMemo } from 'react';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';
import { of } from 'rxjs';

import { routes } from 'app/routes';
import { TabsSection, CheckAuthorization, DeprecatedLoading } from 'components';
import { Api, useApi } from 'services/api';
import { useSubscribableDeprecated } from 'utils/react';

import { AllocateTab } from './innerPages/AllocateTab';
import { WithdrawTab } from './innerPages/WithdrawTab';

const allocateTab = {
  label: 'Allocate',
  value: routes.savings.allocate.getElementKey(),
  to: routes.savings.allocate.getRedirectPath(),
  renderContent: () => <AllocateTab />,
  getData: (api: Api) => api.savings.getPools$(),
};

const withdrawTab = {
  label: 'Withdraw',
  value: routes.savings.withdraw.getElementKey(),
  to: routes.savings.withdraw.getRedirectPath(),
  renderContent: () => <WithdrawTab />,
  getData: (api: Api) => api.user.getMySavingsPools$(),
};

const tabs = [allocateTab, withdrawTab];

export function SavingsPage() {
  const api = useApi();

  const [myPools, meta] = useSubscribableDeprecated(() => api.user.getMySavingsPools$(), [api]);

  const match = useRouteMatch<{ page: string }>('/savings/:page');

  const page = match ? match.params.page : allocateTab.value;

  const isWorthToWatchPage$ = useMemo(
    () => of(myPools ? page !== withdrawTab.value || !!myPools.length : false),
    [myPools, page],
  );

  return (
    <DeprecatedLoading meta={meta}>
      <CheckAuthorization
        isAuthorized$={isWorthToWatchPage$}
        redirectTo={routes.savings.getRoutePath()}
      />
      {myPools?.length && page ? (
        <TabsSection currentValue={page} tabs={tabs} tabComponent={RouterLink} />
      ) : (
        <AllocateTab />
      )}
    </DeprecatedLoading>
  );
}
