import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TabsSection, ComingSoon, Card, Loading, CheckAuthorization } from 'components';
import { makeStyles } from 'utils/styles';
import { routes } from 'app/routes';
import { useSubscribable } from 'utils/react';
import { useApi, Api } from 'services/api';

import * as innerPages from './innerPages';

const tabs = [
  {
    label: 'Savings',
    value: routes.pools.savings.getElementKey(),
    to: routes.pools.savings.getRedirectPath(),
    renderContent: () => <innerPages.Savings />,
    getData: (api: Api) => api.user.getMySavingsPools$(),
  },
  {
    label: 'Investments',
    value: routes.pools.investments.getElementKey(),
    to: routes.pools.investments.getRedirectPath(),
    renderContent: () => <innerPages.Investment />,
    getData: () => of([1]), // TODO load Investment pools
  },
  {
    label: 'Staking',
    value: routes.pools.staking.getElementKey(),
    to: routes.pools.staking.getRedirectPath(),
    renderContent: () => <innerPages.Staking />,
    getData: (api: Api) => api.user.getMyStakingPools$(),
  },
  {
    label: 'DCA',
    value: routes.pools.dca.getElementKey(),
    to: routes.pools.dca.getRedirectPath(),
    renderContent: () => <innerPages.DCA />,
    getData: () => of([1]), // TODO load DCA pools
  },
];

export function MyPools() {
  const classes = useStyles();
  const api = useApi();

  const [filteredTabs, meta] = useSubscribable(
    () =>
      combineLatest(tabs.map(tab => tab.getData(api))).pipe(
        map(tabData => (tabData ? tabs.filter((_, i) => Boolean(tabData[i]?.length)) : undefined)),
      ),
    [api],
  );

  const match = useRouteMatch<{ page: string }>('/pools/:page');

  const defaultPage = filteredTabs?.[0]?.value;

  const page = match ? match.params.page : defaultPage;

  const isComingSoonTab =
    page &&
    [routes.pools.investments.getElementKey(), routes.pools.dca.getElementKey()].includes(page);

  const isWorthToWatchPage$ = useMemo(
    () => of(filteredTabs ? filteredTabs.some(filteredPage => filteredPage.value === page) : false),
    [filteredTabs, page],
  );

  return (
    <Card variant="contained" className={classes.root}>
      <CheckAuthorization
        isAuthorized$={isWorthToWatchPage$}
        redirectTo={routes.pools.getRoutePath()}
      />
      <Loading meta={meta}>
        {filteredTabs?.length && page ? (
          <TabsSection currentValue={page} tabs={filteredTabs} tabComponent={RouterLink}>
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
