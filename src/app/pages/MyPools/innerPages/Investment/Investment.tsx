import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { Table, DeprecatedLoading, Grid } from 'components';
import { percentAmount, tokenAmount, getMockCompositionChartEntriesLiquidity } from 'utils/mock';

import * as tableData from './tableData';
import { EmptyListHint } from '../../Components/EmptyListHint';

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
      <DeprecatedLoading>
        {!entries.length ? (
          <EmptyListHint redirectPage="investments" />
        ) : (
          <Grid container className={classes.table}>
            <Grid item xs={8}>
              <Table.Component columns={tableData.columnsWithSubtable} entries={entries} />
            </Grid>
            <Grid item xs>
              <Table.Component
                columns={tableData.columnForChart}
                entries={[getMockCompositionChartEntriesLiquidity(5)]}
              />
            </Grid>
          </Grid>
        )}
      </DeprecatedLoading>
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
