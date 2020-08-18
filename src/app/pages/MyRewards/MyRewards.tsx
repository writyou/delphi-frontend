import * as React from 'react';
import { LiquidityAmount, TokenAmount, Fraction } from '@akropolis-web/primitives';
import { combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { useApi, Api } from 'services/api';
import { makeStyles } from 'utils/styles';
import { Table, Loading, Grid, Card } from 'components';
import { useSubscribable } from 'utils/react';
import { DEFAULT_LIQUIDITY_CURRENCY } from 'utils/mock';

import * as tableData from './tableData';

function makeEntriesForChart(entries: tableData.Order[]) {
  return [
    entries.map(order => ({
      value: order.NAV,
      payload: order.amount,
    })),
  ];
}

function makeTableEntry(amount: TokenAmount, price: Fraction): tableData.Order {
  return {
    amount,
    NAV: new LiquidityAmount(amount.mul(price), DEFAULT_LIQUIDITY_CURRENCY),
  };
}

function getChartData$(api: Api) {
  return api.user.getRewards$().pipe(
    switchMap(rewards =>
      combineLatest(rewards.map(a => api.prices.getTokenPrice$(a.currency.address))).pipe(
        map(prices => {
          return rewards.map((r, i) => makeTableEntry(r, prices[i]));
        }),
      ),
    ),
    map(data =>
      data.sort((a, b) => {
        return b.NAV.sub(a.NAV).toNumber();
      }),
    ),
  );
}

export function MyRewards() {
  const classes = useStyles();
  const api = useApi();
  const [tableEntries, rewardsMeta] = useSubscribable(() => getChartData$(api), [api]);

  return (
    <Card variant="contained" className={classes.root}>
      <Loading meta={rewardsMeta}>
        {tableEntries && (
          <Grid container className={classes.table}>
            <Grid item xs={8}>
              <Table.Component
                rowPadding="small"
                columns={tableData.columnsWithoutExpandableRows}
                entries={tableEntries}
              />
            </Grid>
            <Grid item xs>
              <Table.Component
                columns={tableData.columnForChart}
                entries={makeEntriesForChart(tableEntries)}
              />
            </Grid>
          </Grid>
        )}
      </Loading>
    </Card>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: 50,
      minHeight: '100%',
    },
    table: {
      position: 'relative',
    },
  }),
  { name: 'MyRewards' },
);
