import React from 'react';
import { useRouteMatch } from 'react-router';

import { routes } from 'app/routes';
import { Tabs, ComingSoon } from 'components';
import { makeStyles } from 'utils/styles';

import * as innerPages from './innerPages';

const tabs = [
  {
    label: 'All-in',
    value: routes.investments.all.getElementKey(),
    to: routes.investments.all.getRedirectPath(),
    renderContent: () => <innerPages.AllIn />,
  },
  {
    label: 'DCA',
    value: routes.investments.dca.getElementKey(),
    to: routes.investments.dca.getRedirectPath(),
    renderContent: () => <innerPages.DCA />,
  },
];

export function InvestmentsPage() {
  const classes = useStyles();

  const match = useRouteMatch<{ page: string }>(`${routes.investments.getRoutePath()}/:page`);
  const defaultPage = routes.investments.all.getElementKey();

  const [selectedPage, setSelectedPage] = React.useState(defaultPage);

  const page = match ? match.params.page : defaultPage;

  const handleTabChange = (_: React.ChangeEvent<{}>, tab: string) => {
    setSelectedPage(tab);
  };

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  return (
    <Tabs currentValue={selectedPage} tabs={tabs} onChange={handleTabChange}>
      <div className={classes.comingSoon}>
        <ComingSoon variant="label" />
      </div>
    </Tabs>
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
  { name: 'InvestmentPage' },
);
