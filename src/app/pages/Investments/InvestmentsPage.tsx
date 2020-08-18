import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { routes } from 'app/routes';
import { TabsSection, ComingSoon } from 'components';
import { makeStyles } from 'utils/styles';

import { AllocateTab } from './AllocateTab';
import { WithdrawTab } from './WithdrawTab';

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
  const classes = useStyles();

  const match = useRouteMatch<{ page: string }>(`${routes.investments.getRoutePath()}/:page`);
  const defaultPage = routes.investments.allocate.getElementKey();

  const [selectedPage, setSelectedPage] = React.useState(defaultPage);

  const page = match ? match.params.page : defaultPage;

  const handleTabChange = (_: React.ChangeEvent<{}>, tab?: string) => {
    tab && setSelectedPage(tab);
  };

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  return (
    <TabsSection
      currentValue={selectedPage}
      tabs={tabs}
      tabComponent={RouterLink}
      onChange={handleTabChange}
    >
      <div className={classes.comingSoon}>
        <ComingSoon variant="label" />
      </div>
    </TabsSection>
  );
}

const useStyles = makeStyles(
  () => ({
    comingSoon: {
      flexGrow: 1,
      alignSelf: 'center',
      display: 'flex',
      marginLeft: 10,
    },
  }),
  { name: 'InvestmentsPage' },
);
