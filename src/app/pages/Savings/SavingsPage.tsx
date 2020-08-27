import React, { useMemo } from 'react';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';
import { of } from 'rxjs';

import { routes } from 'app/routes';
import { TabsSection, CheckAuthorization, Loading } from 'components';
import { Api, useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

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

  const poolsRD = useSubscribable(() => api.user.getMySavingsPools$(), [api]);

  const match = useRouteMatch<{ page: string }>('/savings/:page');

  const page = match ? match.params.page : allocateTab.value;

  const isWorthToWatchPage$ = useMemo(
    () =>
      // TODO need to research api
      of(
        page !== withdrawTab.value ||
          !!poolsRD.fold(
            () => undefined,
            () => undefined,
            () => undefined,
            pools => pools.length,
          ) ||
          false,
      ),
    [poolsRD, page],
  );

  return (
    <Loading data={poolsRD}>
      {pools => (
        <>
          <CheckAuthorization
            isAuthorized$={isWorthToWatchPage$}
            redirectTo={routes.savings.getRoutePath()}
          />
          {pools?.length && page ? (
            <TabsSection currentValue={page} tabs={tabs} tabComponent={RouterLink} />
          ) : (
            <AllocateTab />
          )}
        </>
      )}
    </Loading>
  );
}
