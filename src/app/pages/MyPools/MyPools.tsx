import * as React from 'react';
import { useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TabsSection, ComingSoon, Card, Loading } from 'components';
import { makeStyles } from 'utils/styles';
import { routes } from 'app/routes';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

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
  const api = useApi();

  const defaultPage = routes.pools.savings.getElementKey();
  const match = useRouteMatch<{ page: string }>('/pools/:page');
  const [selectedPage, setSelectedPage] = React.useState(defaultPage);

  const page = match ? match.params.page : defaultPage;

  const handleTabChange = (_: React.ChangeEvent<{}>, tab?: string) => {
    tab && setSelectedPage(tab);
  };

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  const isComingSoonTab = [
    routes.pools.investments.getElementKey(),
    routes.pools.dca.getElementKey(),
  ].includes(selectedPage);

  const [filteredTabs, meta] = useSubscribable(
    () =>
      combineLatest(
        api.user.getMySavingsPools$(),
        of([1]), // TODO load Investment pools
        api.user.getMyStakingPools$(),
        of([1]), // TODO load DCA pools
      ).pipe(
        map(tabData =>
          tabData ? tabs.filter((_, i) => Boolean(tabData[i]) && tabData[i].length > 0) : undefined,
        ),
      ),
    [api],
  );

  return (
    <Card variant="contained" className={classes.root}>
      <Loading meta={meta}>
        {filteredTabs && filteredTabs.length ? (
          <TabsSection
            currentValue={selectedPage}
            tabs={filteredTabs}
            tabComponent={RouterLink}
            onChange={handleTabChange}
          >
            {isComingSoonTab && (
              <div className={classes.comingSoon}>
                <ComingSoon variant="label" />
              </div>
            )}
          </TabsSection>
        ) : (
          'No pools used. Data will appear here after you allocate tokens in the pool.'
        )}
      </Loading>
    </Card>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: 50,
      minHeight: '100%',
    },
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
