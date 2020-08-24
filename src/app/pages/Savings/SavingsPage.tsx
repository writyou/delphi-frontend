import React, { useMemo } from 'react';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';
import { of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { routes } from 'app/routes';
import { TabsSection, CheckAuthorization, Loading } from 'components';
import { Api, useApi } from 'services/api';
import { useSubscribableDeprecated } from 'utils/react';
import { PageForGuest } from 'app/components';

import { AllocateTab } from './innerPages/AllocateTab';
import { WithdrawTab } from './innerPages/WithdrawTab';

const tabs = [
  {
    label: 'Allocate',
    value: routes.savings.allocate.getElementKey(),
    to: routes.savings.allocate.getRedirectPath(),
    renderContent: () => <AllocateTab />,
    getData: (api: Api) => api.savings.getPools$(),
  },
  {
    label: 'Withdraw',
    value: routes.savings.withdraw.getElementKey(),
    to: routes.savings.withdraw.getRedirectPath(),
    renderContent: () => <WithdrawTab />,
    getData: (api: Api) => api.user.getMySavingsPools$(),
  },
];

export function SavingsPage() {
  const defaultPage = routes.savings.allocate.getElementKey();
  const match = useRouteMatch<{ page: string }>('/savings/:page');
  const page = match ? match.params.page : defaultPage;

  const [selectedPage, setSelectedPage] = React.useState(defaultPage);

  const api = useApi();

  const [filteredTabs, meta] = useSubscribableDeprecated(
    () =>
      combineLatest(tabs.map(tab => tab.getData(api))).pipe(
        map(tabData => (tabData ? tabs.filter((_, i) => Boolean(tabData[i]?.length)) : undefined)),
      ),
    [api],
  );

  const isWorthToWatchPage$ = useMemo(
    () => of(filteredTabs ? filteredTabs.some(filteredPage => filteredPage.value === page) : false),
    [filteredTabs, page],
  );

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  const handleTabChange = (_: React.ChangeEvent<{}>, tab?: string) => {
    tab && setSelectedPage(tab);
  };

  return (
    <Loading meta={meta}>
      <CheckAuthorization
        isAuthorized$={isWorthToWatchPage$}
        redirectTo={routes.savings.getRoutePath()}
      />
      {filteredTabs?.length && page ? (
        <TabsSection
          currentValue={selectedPage}
          tabs={filteredTabs}
          tabComponent={RouterLink}
          onChange={handleTabChange}
        />
      ) : (
        <PageForGuest />
      )}
    </Loading>
  );
}
