import * as React from 'react';
import { useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Tabs, ComingSoon } from 'components';
import { makeStyles } from 'utils/styles';
import { routes } from 'app/routes';

import * as innerPages from './innerPages';

const tabs = [
  {
    label: 'Savings',
    value: routes.pools.savings.getElementKey(),
    to: routes.pools.savings.getRedirectPath(),
    renderContent: () => <innerPages.Savings />,
  },
  {
    label: 'Investments',
    value: routes.pools.investments.getElementKey(),
    to: routes.pools.investments.getRedirectPath(),
    renderContent: () => <innerPages.Investment />,
  },
  {
    label: 'Staking',
    value: routes.pools.staking.getElementKey(),
    to: routes.pools.staking.getRedirectPath(),
    renderContent: () => <innerPages.Staking />,
  },
  {
    label: 'DCA',
    value: routes.pools.dca.getElementKey(),
    to: routes.pools.dca.getRedirectPath(),
    renderContent: () => <innerPages.DCA />,
  },
];

export function MyPools() {
  const classes = useStyles();

  const defaultPage = routes.pools.savings.getElementKey();
  const match = useRouteMatch<{ page: string }>('/pools/:page');
  const [selectedPage, setSelectedPage] = React.useState(defaultPage);

  const page = match ? match.params.page : defaultPage;

  const handleTabChange = (_: React.ChangeEvent<{}>, tab: string) => {
    setSelectedPage(tab);
  };

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  return <div className={classes.root}>{renderTabs()}</div>;

  function renderTabs() {
    const isComingSoonTab = [
      routes.pools.investments.getElementKey(),
      routes.pools.dca.getElementKey(),
    ].includes(selectedPage);

    return (
      <Tabs
        currentValue={selectedPage}
        tabs={tabs}
        tabComponent={RouterLink}
        onChange={handleTabChange}
      >
        {isComingSoonTab && (
          <div className={classes.comingSoon}>
            <ComingSoon variant="label" />
          </div>
        )}
      </Tabs>
    );
  }
}

const useStyles = makeStyles(
  () => ({
    root: {},
    comingSoon: {
      flexGrow: 1,
      alignSelf: 'center',
      display: 'flex',
      marginLeft: 10,
    },
    chart: {
      marginTop: 'auto',
    },
  }),
  { name: 'MyPools' },
);
