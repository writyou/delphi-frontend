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
import { PageForGuest } from 'app/components';

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
    getData: () => of([]), // TODO load Investment pools
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
    getData: () => of([]), // TODO load DCA pools
  },
];

export function MyPools() {
  const classes = useStyles();
  const api = useApi();

  const filteredTabsRD = useSubscribable(
    () =>
      combineLatest(tabs.map(tab => tab.getData(api))).pipe(
        map(tabData =>
          tabs.filter((_, i) => Boolean(tabData[i]?.length)).map(({ getData, ...tab }) => tab),
        ),
      ),
    [api],
  );

  const match = useRouteMatch<{ page: string }>('/pools/:page');

  // TODO need to research api
  const defaultPage = filteredTabsRD.fold(
    () => undefined,
    () => undefined,
    () => undefined,
    filteredTabs => filteredTabs[0]?.value,
  );

  const page = match ? match.params.page : defaultPage;

  const isComingSoonTab =
    page &&
    [routes.pools.investments.getElementKey(), routes.pools.dca.getElementKey()].includes(page);

  const isWorthToWatchPage$ = useMemo(
    () =>
      // TODO need to research api
      of(
        filteredTabsRD.fold(
          () => false,
          () => false,
          () => false,
          filteredTabs => filteredTabs.some(filteredTab => filteredTab.value === page),
        ),
      ),
    [filteredTabsRD, page],
  );

  return (
    <Card variant="contained" className={classes.root}>
      <Loading data={filteredTabsRD}>
        {filteredTabs => (
          <>
            <CheckAuthorization
              isAuthorized$={isWorthToWatchPage$}
              redirectTo={routes.pools.getRoutePath()}
            />
            {filteredTabs?.length && page ? (
              <TabsSection currentValue={page} tabs={filteredTabs} tabComponent={RouterLink}>
                {isComingSoonTab && (
                  <div className={classes.comingSoon}>
                    <ComingSoon variant="label" />
                  </div>
                )}
              </TabsSection>
            ) : (
              <PageForGuest />
            )}
          </>
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
