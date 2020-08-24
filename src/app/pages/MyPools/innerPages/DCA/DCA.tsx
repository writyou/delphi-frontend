import * as React from 'react';
import { LiquidityAmount } from '@akropolis-web/primitives';

import { makeStyles } from 'utils/styles';
import { Table, DeprecatedLoading, Grid, PieChartData } from 'components';
import {
  percentAmount,
  tokenAmount,
  liquidityAmount,
  zeroAddress,
  getMockCompositionChartEntriesLiquidity,
} from 'utils/mock';
import { SavingsPool } from 'model/types';

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

export const entriesForChart = [
  new Array<PieChartData<LiquidityAmount, SavingsPool>>(5).fill({
    value: liquidityAmount,
    payload: {
      address: zeroAddress,
      poolName: 'sBTC',
      poolToken: tokenAmount.currency,
      apy: percentAmount,
      tokens: [],
    },
  }),
];

export function DCA() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DeprecatedLoading>
        {!entries.length ? (
          <EmptyListHint redirectPage="dca" />
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
  { name: 'DCA' },
);
