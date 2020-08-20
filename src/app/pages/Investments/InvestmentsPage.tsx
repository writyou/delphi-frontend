import React from 'react';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';

import { routes } from 'app/routes';
import { TabsSection } from 'components';

import { AllocateTab } from './innerPages/AllocateTab';
import { WithdrawTab } from './innerPages/WithdrawTab';

const tabs = [
  {
    label: 'Allocate',
    value: routes.investments.allocate.getElementKey(),
    to: routes.investments.allocate.getRedirectPath(),
    renderContent: () => <AllocateTab />,
  },
  {
    label: 'Withdraw',
    value: routes.investments.withdraw.getElementKey(),
    to: routes.investments.withdraw.getRedirectPath(),
    renderContent: () => <WithdrawTab />,
  },
];

export function InvestmentsPage() {
  const defaultPage = routes.investments.allocate.getElementKey();
  const match = useRouteMatch<{ page: string }>(`${routes.investments.getRoutePath()}/:page`);
  const page = match ? match.params.page : defaultPage;

  const [selectedPage, setSelectedPage] = React.useState(defaultPage);

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  const handleTabChange = (_: React.ChangeEvent<{}>, tab?: string) => {
    tab && setSelectedPage(tab);
  };

  return (
    <TabsSection
      currentValue={selectedPage}
      tabs={tabs}
      tabComponent={RouterLink}
      onChange={handleTabChange}
    />
  );
}
