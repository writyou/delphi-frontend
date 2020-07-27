import * as React from 'react';
import moment from 'moment';

import { BalanceChart, Loading } from 'components';
import { makeStyles, useTheme } from 'utils/styles';
import { ChartWithCat } from 'components/icons';

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
    <Loading>
      <div className={classes.hidden}>
        <svg>
          {theme.gradients.poolBalanceChart[0].svgLinear('lEnterPriceGradient')}
          {theme.gradients.poolBalanceChart[1].svgLinear('lExitPriceGradient')}
        </svg>
      </div>
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
  );
}

export const useStyles = makeStyles(
  () => ({
    hidden: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    cat: {
      fontSize: 500,
      position: 'absolute',
      top: -100,
    },
    container: {
      position: 'relative',
    },
  }),
  { name: 'PortfolioBalanceChart' },
);

export { PortfolioBalanceChart };
