import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';
import { TabsList, TabContext, Tab, TabPanel, Label } from 'components';

import * as innerPages from './innerPages';

export function InvestmentsPage() {
  const match = useRouteMatch<{ page: string }>('/investing/:page');
  const [selectedPage, setSelectedPage] = React.useState('all');

  const page = match ? match.params.page : 'all';

  const handleTabChange = (_: React.ChangeEvent<{}>, tab: string) => {
    setSelectedPage(tab);
  };

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  const classes = useStyles();

  return (
    <TabContext value={selectedPage}>
      <div className={classes.navigationBar}>
        <TabsList value={selectedPage} className={classes.tabs} onChange={handleTabChange}>
          <Tab
            label="All-in"
            className={classes.tab}
            component={Link}
            value={routes.investments.all.getElementKey()}
            to={routes.investments.all.getRedirectPath()}
          />
          <Tab
            label="DCA"
            className={classes.tab}
            component={Link}
            value={routes.investments.dca.getElementKey()}
            to={routes.investments.dca.getRedirectPath()}
          />
        </TabsList>
        <Label withComingSoon />
      </div>
      <TabPanel value={routes.investments.all.getElementKey()}>
        <innerPages.AllIn />
      </TabPanel>
      <TabPanel value={routes.investments.dca.getElementKey()}>
        <innerPages.DCA />
      </TabPanel>
    </TabContext>
  );
}

const useStyles = makeStyles(
  () => ({
    tabs: {},
    tab: {
      minWidth: 112,
    },
    navigationBar: {
      marginBottom: 40,
      display: 'flex',
      alignItems: 'center',
    },
  }),
  { name: 'InvestingPage' },
);
