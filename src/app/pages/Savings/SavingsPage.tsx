import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';
import { TabsList, TabContext, Tab, TabPanel } from 'components';

import { Card } from './Card/Card';

export function SavingsPage() {
  const match = useRouteMatch<{ page: string }>('/savings/:page');
  const [selectedPage, setSelectedPage] = React.useState('allocate');

  const page = match ? match.params.page : 'allocate';

  const handleTabChange = (_: React.ChangeEvent<{}>, tab: string) => {
    setSelectedPage(tab);
  };

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  const classes = useStyles();

  return renderTabs();

  function renderTabs() {
    return (
      <Grid className={classes.root}>
        <TabContext value={selectedPage}>
          <div className={classes.navigationBar}>
            <TabsList value={selectedPage} className={classes.tabs} onChange={handleTabChange}>
              <Tab
                label="Allocate"
                className={classes.tab}
                component={Link}
                value={routes.savings.allocate.getElementKey()}
                to={routes.savings.allocate.getRedirectPath()}
              />
              <Tab
                label="Withdraw"
                className={classes.tab}
                component={Link}
                value={routes.savings.withdraw.getElementKey()}
                to={routes.savings.withdraw.getRedirectPath()}
              />
            </TabsList>
          </div>
          <TabPanel value={routes.savings.allocate.getElementKey()}>
            <Card value={3} />
            <Card value={3} />
            <Card value={3} />
          </TabPanel>
          <TabPanel value={routes.savings.withdraw.getElementKey()}>
            Withdraw not implemented
          </TabPanel>
        </TabContext>
      </Grid>
    );
  }
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: '50px 60px',
    },
    tabs: {
      marginBottom: 40,
    },
    tab: {
      minWidth: 112,
    },
    navigationBar: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    cardsContainer: {
      paddingTop: 60,
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
  { name: 'SavingsPage' },
);
