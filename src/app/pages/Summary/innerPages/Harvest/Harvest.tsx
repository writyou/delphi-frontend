import * as React from 'react';
import BN from 'bn.js';

import { makeStyles } from 'utils/styles';
import { NewTable, Loading, Typography, Hint, Grid } from 'components';
import { percentAmount, liquidityAmount, zeroAddress } from 'utils/mock';
import { LiquidityAmount, Currency, TokenAmount, Token } from 'model/entities';

import * as tableData from './tableData';

const entries: tableData.Order[] = [
  {
    asset: 'COMP',
    amount: 0,
    APY: percentAmount,
    NAV: liquidityAmount,
  },
  {
    asset: 'AKRO',
    amount: 0,
    APY: percentAmount,
    NAV: liquidityAmount,
  },
  {
    asset: 'ADEL',
    amount: 0,
    APY: percentAmount,
    NAV: liquidityAmount,
  },
];

export const entriesForChart = [
  entries.map(order => ({
    value: new LiquidityAmount(new BN(20), new Currency('$', 18)),
    payload: new TokenAmount('0', new Token(zeroAddress, order.asset, 18)),
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
