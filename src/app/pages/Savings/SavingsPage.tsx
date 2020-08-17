import React from 'react';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';

import { routes } from 'app/routes';
import { TabsSection } from 'components';

import { AllocateTab } from './innerPages/AllocateTab';
import { WithdrawTab } from './innerPages/WithdrawTab';

const tabs = [
  {
    label: 'Allocate',
    value: routes.savings.allocate.getElementKey(),
    to: routes.savings.allocate.getRedirectPath(),
    renderContent: () => <AllocateTab />,
  },
  {
    label: 'Withdraw',
    value: routes.savings.withdraw.getElementKey(),
    to: routes.savings.withdraw.getRedirectPath(),
    renderContent: () => <WithdrawTab />,
  },
];

export function SavingsPage() {
  const defaultPage = routes.savings.allocate.getElementKey();
  const match = useRouteMatch<{ page: string }>('/savings/:page');
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
