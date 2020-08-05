import * as React from 'react';
import BN from 'bn.js';

import { makeStyles } from 'utils/styles';
import { NewTable, Loading, Typography, Hint, Grid } from 'components';
import { percentAmount, liquidityAmount, tokenAmount } from 'utils/mock';
import { LiquidityAmount, Currency } from 'model/entities';

import * as tableData from './tableData';

const entries: tableData.Order[] = [
  {
    asset: 'MOCK',
    amount: 0.4,
    APY: percentAmount,
    NAV: liquidityAmount,
  },
];

export const entriesForChart = [
  new Array<number>(5).fill(0).map((_, index) => ({
    value: new LiquidityAmount(new BN(20 * (index + 1)), new Currency('$', 18)),
    payload: tokenAmount,
  })),
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
