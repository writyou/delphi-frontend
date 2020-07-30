import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { CompositionChart, TokensTableLegend, PieChartData } from 'components';
import { TokenAmount } from 'model/entities';
import { SavingsPool } from 'model/types';
import { tokenAmount, zeroAddress } from 'utils/mock';

export const entries = new Array<PieChartData<TokenAmount, SavingsPool>>(5).fill({
  value: tokenAmount,
  payload: {
    address: zeroAddress,
    devName: 'Curve',
    poolToken: tokenAmount.currency,
    tokens: [],
  },
});

function PoolPieChart() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CompositionChart
        chartData={entries}
        Legend={({ sectors }) => (
          <TokensTableLegend
            sectors={sectors}
            renderLabel={({ pieData }) => pieData.payload.devName}
          />
        )}
        size="medium"
      />
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
      padding: 10,
      display: 'flex',
      flexWrap: 'nowrap',
    },
    hidden: {
      height: 0,
      visibility: 'hidden',
      width: 0,
      position: 'absolute',
      zIndex: -100,
    },
    table: {
      marginLeft: 25,
      marginTop: 15,
    },
  }),
  { name: 'PoolPieChart' },
);

export { PoolPieChart };
