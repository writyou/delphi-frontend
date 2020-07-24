import * as React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import { Grid, TabContext, TabsList, Tab, TabPanel, ComingSoon } from 'components';
import { makeStyles } from 'utils/styles';
import { routes } from 'app/routes';
import {
  ActiveMembers,
  TotalValueLocked,
  MyHarvest,
  DCA,
  MyInvestment,
  MySavings,
} from 'features/metrics';

import * as innerPages from './innerPages';
import { PortfolioBalanceChart } from './Components/PortfolioBalanceChart';

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
    <Grid container direction="column" className={classes.root}>
      <Grid container xs>
        <Grid item xs>
          <div className={classes.chart}>
            <ComingSoon position="overlay" />
            <PortfolioBalanceChart />
          </div>
        </Grid>
        {metricsBlock()}
      </Grid>
      <Grid container direction="column" xs className={classes.innerPages}>
        {tabsBlock()}
      </Grid>
    </Grid>
  );

  function tabsBlock() {
    return (
      <TabContext value={selectedPage}>
        <div className={classes.navigationBar}>
          <TabsList value={selectedPage} className={classes.tabs} onChange={handleTabChange}>
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

  function metricsBlock() {
    return (
      <Grid container direction="column" xs className={classes.metrics}>
        <ComingSoon position="overlay" />
        <Grid container justify="space-between" className={classes.liveStats}>
          <Grid item>Live Stats</Grid>
          <Grid item>
            <ActiveMembers />
          </Grid>
          <Grid item>
            <TotalValueLocked />
          </Grid>
        </Grid>
        <Grid container justify="space-between" xs>
          <MySavings />
          <MyInvestment />
          <DCA />
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
    chart: {
      maxWidth: 537,
      position: 'relative',
    },
    metrics: {
      position: 'relative',
    },
    liveStats: {
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: 40,
      marginBottom: 30,
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
    innerPages: {
      marginTop: 60,
    },
  }),
  { name: 'MySummary' },
);
