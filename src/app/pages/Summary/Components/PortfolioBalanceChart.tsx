import * as React from 'react';
import moment from 'moment';

import { BalanceChart, Loading, Label, Grid } from 'components';
import { makeStyles, useTheme } from 'utils/styles';

import { ChartGraphMock } from './ChartGraphMock';
import { PortfolioBalanceLegendItem } from './PortfolioBalanceLegendItem';

export const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
      maxWidth: 553,
    },
    hidden: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    chartMock: {
      position: 'absolute',
      maxWidth: 553,
      width: '100%',
      height: 276,
    },
  }),
  { name: 'PortfolioBalanceChart' },
);

interface PoolPoint {
  date: number;
  lEnterPrice: number;
  lExitPrice: number;
}

function PortfolioBalanceChart() {
  const classes = useStyles();
  const theme = useTheme();

  const mockedPoints = React.useMemo<PoolPoint[]>(
    () => [
      {
        date: Date.now() - moment().subtract(1, 'days').unix() * 1000, // Date in milliseconds
        lEnterPrice: 0,
        lExitPrice: 0,
      },
      { date: Date.now(), lEnterPrice: 0, lExitPrice: 0 }, // Date in milliseconds
    ],
    [],
  );

  const chartPoints: PoolPoint[] = mockedPoints;

  const renderCurrentBalance = () => {
    return (
      <Grid container spacing={3}>
        <Grid item>
          <PortfolioBalanceLegendItem title="Savings Yield" color="#d93cef" />
        </Grid>
        <Grid item>
          <PortfolioBalanceLegendItem title="Capital Gains/Losses" color="#594cf2" />
        </Grid>
        <Grid item>
          <PortfolioBalanceLegendItem title="Harvest" color="#5ef2ab" />
        </Grid>
        <Grid item>
          <PortfolioBalanceLegendItem title="Savings Yield" color="#fce58d" />
        </Grid>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <Loading>
        <div className={classes.hidden}>
          <svg>
            {theme.gradients.poolBalanceChart[0].svgLinear('lEnterPriceGradient')}
            {theme.gradients.poolBalanceChart[1].svgLinear('lExitPriceGradient')}
          </svg>
        </div>
        <ChartGraphMock className={classes.chartMock} />
        <BalanceChart
          chartPoints={chartPoints}
          chartLines={['lExitPrice', 'lEnterPrice']}
          chartLineColors={{
            lEnterPrice: 'url(#lEnterPriceGradient)',
            lExitPrice: 'url(#lExitPriceGradient)',
          }}
          title={<Label withComingSoon>Portfolio balance</Label>}
          renderCurrentBalance={renderCurrentBalance}
        />
      </Loading>
    </div>
  );
}

export { PortfolioBalanceChart };
