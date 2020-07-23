import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';
import { TabsList, TabContext, Tab, TabPanel } from 'components';

export function InvestingPage() {
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
    <Grid className={classes.root}>
      <TabContext value={selectedPage}>
        <div className={classes.navigationBar}>
          <TabsList value={selectedPage} className={classes.tabs} onChange={handleTabChange}>
            <Tab
              label="All-in"
              className={classes.tab}
              component={Link}
              value={routes.investing.all.getElementKey()}
              to={routes.investing.all.getRedirectPath()}
            />
            <Tab
              label="DCA"
              className={classes.tab}
              component={Link}
              value={routes.investing.dca.getElementKey()}
              to={routes.investing.dca.getRedirectPath()}
            />
          </TabsList>
        </div>
        <TabPanel value={routes.investing.all.getElementKey()}>All-in not implemented</TabPanel>
        <TabPanel value={routes.investing.dca.getElementKey()}>DCA not implemented</TabPanel>
      </TabContext>
    </Grid>
  );
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
  }),
  { name: 'InvestingPage' },
);
