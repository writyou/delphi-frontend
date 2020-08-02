import * as React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { Grid, TabContext, TabsList, Tab, TabPanel, Label, Divider } from 'components';
import { makeStyles } from 'utils/styles';
import { routes } from 'app/routes';
import { MyHarvest, DCA, MyInvestment, MySavings } from 'features/metrics';

import * as innerPages from './innerPages';
import { PortfolioBalanceChart } from './Components/PortfolioBalanceChart';
import { LiveStats } from './Components/LiveStats';

export function SummaryPage() {
  const classes = useStyles();
  const match = useRouteMatch<{ page: string }>('/summary/:page');
  const [selectedPage, setSelectedPage] = React.useState(routes.summary.savings.getElementKey());

  const page = match ? match.params.page : routes.summary.savings.getElementKey();

  const handleTabChange = (_: React.ChangeEvent<{}>, tab: string) => {
    setSelectedPage(tab);
  };

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={5}>
          <PortfolioBalanceChart />
        </Grid>
        <Grid item xs={7}>
          {renderMetrics()}
        </Grid>
        <Grid item xs={12}>
          {renderTabs()}
        </Grid>
      </Grid>
    </div>
  );

  function renderTabs() {
    return (
      <TabContext value={selectedPage}>
        <div className={classes.navigationBar}>
          <TabsList value={selectedPage} onChange={handleTabChange}>
            <Tab
              label="My Savings Pools"
              className={classes.tab}
              component={Link}
              value={routes.summary.savings.getElementKey()}
              to={routes.summary.savings.getRedirectPath()}
            />
            <Tab
              label="My Investment Pools"
              className={classes.tab}
              component={Link}
              value={routes.summary.investment.getElementKey()}
              to={routes.summary.investment.getRedirectPath()}
            />
            <Tab
              label="DCA"
              className={classes.tab}
              component={Link}
              value={routes.summary.dca.getElementKey()}
              to={routes.summary.dca.getRedirectPath()}
            />
            <Tab
              label="My Harvest"
              className={classes.tab}
              component={Link}
              value={routes.summary.harvest.getElementKey()}
              to={routes.summary.harvest.getRedirectPath()}
            />
          </TabsList>
          {selectedPage !== routes.summary.savings.getElementKey() && <Label withComingSoon />}
        </div>
        <TabPanel value={routes.summary.savings.getElementKey()}>
          <innerPages.Savings />
        </TabPanel>
        <TabPanel value={routes.summary.investment.getElementKey()}>
          <innerPages.Investment />
        </TabPanel>
        <TabPanel value={routes.summary.dca.getElementKey()}>
          <innerPages.DCA />
        </TabPanel>
        <TabPanel value={routes.summary.harvest.getElementKey()}>
          <innerPages.Harvest />
        </TabPanel>
      </TabContext>
    );
  }

  function renderMetrics() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LiveStats />
        </Grid>
        <Grid item xs={12}>
          <Divider orientation="horizontal" />
        </Grid>
        <Grid item xs={3}>
          <MySavings />
        </Grid>
        <Grid item xs={3}>
          <MyInvestment />
        </Grid>
        <Grid item xs={3}>
          <DCA />
        </Grid>
        <Grid item xs={3}>
          <MyHarvest />
        </Grid>
      </Grid>
    );
  }
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: 50,
    },
    tab: {
      minWidth: 112,
    },
    navigationBar: {
      marginBottom: 40,
      display: 'flex',
      alignItems: 'center',
    },
    innerPages: {
      marginTop: 60,
    },
  }),
  { name: 'SummaryPage' },
);
