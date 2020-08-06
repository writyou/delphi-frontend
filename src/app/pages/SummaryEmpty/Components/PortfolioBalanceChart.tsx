import * as React from 'react';
import moment from 'moment';

import { BalanceChart, Loading } from 'components';
import { makeStyles, useTheme } from 'utils/styles';
import { ChartWithCat } from 'components/icons';
import { ChartGraphMock } from 'app/pages/Summary/Components/ChartGraphMock';

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
    return <div />;
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
        <ChartGraphMock className={classes.chartMock} withoutLines />
        <div className={classes.container}>
          <BalanceChart
            chartPoints={chartPoints}
            chartLines={['lExitPrice', 'lEnterPrice']}
            chartLineColors={{
              lEnterPrice: 'url(#lEnterPriceGradient)',
              lExitPrice: 'url(#lExitPriceGradient)',
            }}
            title="Portfolio balance"
            renderCurrentBalance={renderCurrentBalance}
          />
          <ChartWithCat className={classes.cat} />
        </div>
      </Loading>
    </div>
  );
}

export const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
    },
    hidden: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    cat: {
      position: 'absolute',
      top: 25,
      width: '100%',
      maxWidth: 523,
      height: 'unset',
    },
    container: {
      position: 'relative',
      maxWidth: 553,
    },
    chartMock: {
      position: 'absolute',
      width: '100%',
      maxWidth: 553,
      height: 'unset',
    },
  }),
  { name: 'PortfolioBalanceChart' },
);

export { PortfolioBalanceChart };
