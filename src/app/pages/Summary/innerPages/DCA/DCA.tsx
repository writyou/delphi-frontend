import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { NewTable, Loading, Typography, Hint, Grid, ComingSoon } from 'components';
import { percentAmount, tokenAmount } from 'utils/mock';

import * as tableData from './tableData';

const entries: tableData.Order[] = [
  {
    pool: 'sUSD',
    poolFullTitle: 'Curve',
    tokens: ['USDT', 'DAI'],
    APY: percentAmount,
    balance: tokenAmount,
    additionalTable: [0, 4],
  },
];

export const entriesForChart = [
  [
    {
      value: tokenAmount,
      label: 'RSV',
    },
    {
      value: tokenAmount,
      label: 'DAI',
    },
    {
      value: tokenAmount,
      label: 'USDT',
    },
    {
      value: tokenAmount,
      label: 'TUSD',
    },
    {
      value: tokenAmount,
      label: 'USDC',
    },
  ],
];

export function DCA() {
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
              <NewTable.Component columns={tableData.columnsWithSubtable} entries={entries} />
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
  { name: 'DCA' },
);
