import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { CompositionChart, TokensTableLegend, PieChartData, CompositionLegend } from 'components';
import { TokenAmount } from 'model/entities';
import { tokenAmount } from 'utils/mock';

export const entries = new Array<PieChartData<TokenAmount>>(5).fill({
  value: tokenAmount,
  payload: undefined,
});

function PoolPieChart() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CompositionChart chartData={entries} size="medium" />
      <CompositionLegend chartData={entries} Template={TokensTableLegend} />
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
