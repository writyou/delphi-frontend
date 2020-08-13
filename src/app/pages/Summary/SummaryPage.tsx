import * as React from 'react';
import { useRouteMatch } from 'react-router';

import {
  Grid,
  Label,
  Divider,
  Metric,
  FormattedAmount,
  CompositionChart,
  Tabs,
  ComingSoon,
} from 'components';
import { makeStyles } from 'utils/styles';
import { routes } from 'app/routes';
import { UserSavingsPoolsAvgAPY, UserSavingsPoolsBalancesComposition } from 'features/savingsPools';
import { percentAmount, getMockCompositionChartEntriesToken } from 'utils/mock';

import * as innerPages from './innerPages';
import { PortfolioBalanceChart } from './Components/PortfolioBalanceChart';
import { LiveStats } from './Components/LiveStats';

const tabs = [
  {
    label: 'My Savings Pools',
    value: routes.summary['my-savings-pools'].getElementKey(),
    to: routes.summary['my-savings-pools'].getRedirectPath(),
    renderContent: () => <innerPages.MySavingsPools />,
  },
  {
    label: 'My Investment Pools',
    value: routes.summary.investment.getElementKey(),
    to: routes.summary.investment.getRedirectPath(),
    renderContent: () => <innerPages.Investment />,
  },
  {
    label: 'DCA',
    value: routes.summary.dca.getElementKey(),
    to: routes.summary.dca.getRedirectPath(),
    renderContent: () => <innerPages.DCA />,
  },
  {
    label: 'Savings',
    value: routes.summary.savings.getElementKey(),
    to: routes.summary.savings.getRedirectPath(),
    renderContent: () => <innerPages.Savings />,
  },
  {
    label: 'My Harvest',
    value: routes.summary.harvest.getElementKey(),
    to: routes.summary.harvest.getRedirectPath(),
    renderContent: () => <innerPages.Harvest />,
  },
];

export function SummaryPage() {
  const classes = useStyles();

  const defaultPage = routes.summary.savings.getElementKey();
  const match = useRouteMatch<{ page: string }>('/summary/:page');
  const [selectedPage, setSelectedPage] = React.useState(defaultPage);

  const page = match ? match.params.page : defaultPage;

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
      <Tabs currentValue={selectedPage} tabs={tabs} onChange={handleTabChange}>
        {selectedPage !== routes.summary.savings.getElementKey() && (
          <div className={classes.comingSoon}>
            <ComingSoon variant="label" />
          </div>
        )}
      </Tabs>
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
        <Grid item xs container direction="column" spacing={3} justify="space-between">
          <Grid item>
            <Label>My Savings</Label>
          </Grid>
          <Grid item className={classes.chart}>
            <UserSavingsPoolsBalancesComposition size="extra-small" />
          </Grid>
          <Grid item>
            <Metric title="APY" value={<UserSavingsPoolsAvgAPY />} />
          </Grid>
        </Grid>
        <Grid item xs container direction="column" spacing={3} justify="space-between">
          <Grid item>
            <Label withComingSoon>My Investment</Label>
          </Grid>
          <Grid item className={classes.chart}>
            <CompositionChart
              chartData={getMockCompositionChartEntriesToken(5)}
              size="extra-small"
            />
          </Grid>
          <Grid item>
            <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />
          </Grid>
        </Grid>
        <Grid item xs container direction="column" spacing={3} justify="space-between">
          <Grid item>
            <Label withComingSoon>DCA</Label>
          </Grid>
          <Grid item className={classes.chart}>
            <CompositionChart
              chartData={getMockCompositionChartEntriesToken(5)}
              size="extra-small"
            />
          </Grid>
          <Grid item>
            <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />
          </Grid>
        </Grid>
        <Grid item xs container direction="column" spacing={3} justify="space-between">
          <Grid item>
            <Label withComingSoon>My Harvest</Label>
          </Grid>
          <Grid item className={classes.chart}>
            <CompositionChart
              chartData={getMockCompositionChartEntriesToken(5)}
              size="extra-small"
            />
          </Grid>
          <Grid item>
            <Metric title="APY" value={<FormattedAmount sum={percentAmount} />} />
          </Grid>
        </Grid>
      </Grid>
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
  { name: 'SummaryPage' },
);
