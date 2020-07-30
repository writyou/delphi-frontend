import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { NewTable, Loading, Typography, Hint, Grid, ComingSoon, PieChartData } from 'components';
import { percentAmount, liquidityAmount, tokenAmount } from 'utils/mock';
import { LiquidityAmount, TokenAmount } from 'model/entities';

import * as tableData from './tableData';

const entries: tableData.Order[] = [
  {
    asset: 'AKRO',
    amount: 0.4,
    APY: percentAmount,
    NAV: liquidityAmount,
  },
];

export const entriesForChart = [
  new Array<PieChartData<LiquidityAmount, TokenAmount>>(5).fill({
    value: liquidityAmount,
    payload: tokenAmount,
  }),
];

export function Harvest() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Loading>
        {!entries.length ? (
          <Hint>
            <Typography>Not found</Typography>
          </Hint>
        ) : (
          <Grid container className={classes.table}>
            <ComingSoon position="overlay" />
            <Grid item xs={8}>
              <NewTable.Component
                columns={tableData.columnsWithoutExpandableRows}
                entries={entries}
              />
            </Grid>
            <Grid item xs>
              <NewTable.Component columns={tableData.columnForChart} entries={entriesForChart} />
            </Grid>
          </Grid>
        )}
      </Loading>
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {},
    table: {
      position: 'relative',
    },
  }),
  { name: 'Harvest' },
);
