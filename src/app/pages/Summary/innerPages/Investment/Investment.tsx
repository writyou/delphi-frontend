import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { NewTable, Loading, Typography, Hint, Grid } from 'components';
import { percentAmount, tokenAmount, compositionChartEntriesLiquidity } from 'utils/mock';

import * as tableData from './tableData';

const entries: tableData.Order[] = [
  {
    pool: 'sBTC',
    poolFullTitle: 'Curve',
    tokens: ['USDT', 'DAI'],
    APY: percentAmount,
    balance: tokenAmount,
    additionalTable: [0, 4],
  },
];

export function Investment() {
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
              <NewTable.Component columns={tableData.columnsWithSubtable} entries={entries} />
            </Grid>
            <Grid item xs>
              <NewTable.Component
                columns={tableData.columnForChart}
                entries={[compositionChartEntriesLiquidity(5)]}
              />
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
  { name: 'Investment' },
);
