import * as React from 'react';
import { LiquidityAmount } from '@akropolis-web/primitives';
import { combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { useApi, Api } from 'services/api';
import { makeStyles } from 'utils/styles';
import { Loading, Grid, Card, FormattedAmount, ComingSoon } from 'components';
import { useSubscribable } from 'utils/react';
import { DEFAULT_LIQUIDITY_CURRENCY } from 'utils/mock';
import { getLiquidityAmountsSum } from 'utils/helpers';
import { WithdrawRewardsButton } from 'features/rewards';

import { RewardsTable, TableData, Order } from './RewardsTable';
import { RewardsComposition } from './RewardsComposition';

function makeChartData(entries: TableData | undefined) {
  return entries
    ? entries.map(order => ({
        value: order.NAV,
        payload: order.amount,
      }))
    : [];
}

function getTotalNav(entries: TableData | undefined) {
  return entries
    ? getLiquidityAmountsSum(entries.map(e => e.NAV))
    : new LiquidityAmount(0, DEFAULT_LIQUIDITY_CURRENCY);
}

function getRewardsData$(api: Api) {
  return api.user.getRewards$().pipe(
    switchMap(rewards => {
      const filteredRewards = rewards
        .filter(a => !a.isZero())
        .map(a => api.prices.getTokenPrice$(a.currency.address));
      if (filteredRewards.length === 0) {
        return of([]);
      }

      return combineLatest(filteredRewards).pipe(
        map(prices =>
          rewards.map(
            (amount, i): Order => ({
              amount,
              NAV: new LiquidityAmount(amount.mul(prices[i]), DEFAULT_LIQUIDITY_CURRENCY),
            }),
          ),
        ),
      );
    }),
    map(data => data.sort((a, b) => b.NAV.sub(a.NAV).toNumber())),
  );
}

export function MyRewards() {
  const classes = useStyles();
  const api = useApi();
  const [tableEntries, rewardsMeta] = useSubscribable(() => getRewardsData$(api), [api]);
  const [isUserExist, userMeta] = useSubscribable(() => api.user.isUserExist$(), [api]); // TODO add check pool balances

  return (
    <Card variant="contained" className={classes.root}>
      <Loading meta={[userMeta, rewardsMeta]}>
        {isUserExist ? (
          <Grid container className={classes.table} spacing={6}>
            <Grid item xs={6}>
              <div className={classes.sectionTitle}>Composition</div>
              <RewardsComposition data={makeChartData(tableEntries)} />
            </Grid>
            <Grid item xs={3}>
              <div className={classes.sectionTitle}>Total NAV</div>
              <div className={classes.totalNav}>
                <FormattedAmount sum={getTotalNav(tableEntries)} />
              </div>
            </Grid>
            <Grid item container xs={3} justify="flex-end">
              <div className={classes.withdrawButton}>
                <WithdrawRewardsButton
                  totalNav={getTotalNav(tableEntries)}
                  size="small"
                  color="primary"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.sectionTitle}>Portfolio Balance</div>
              <div className={classes.lineChartMock}>
                <ComingSoon variant="label" />
              </div>
            </Grid>
            <Grid item xs={6}>
              {tableEntries && <RewardsTable data={tableEntries} />}
            </Grid>
          </Grid>
        ) : (
          'No pools used. Data will appear here after you allocate tokens in the pool.'
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
    sectionTitle: {
      marginBottom: 26,
    },
    totalNav: {
      fontSize: 22,
    },
    withdrawButton: {
      width: 155,
    },
    lineChartMock: {
      height: 250,
      borderBottom: 'solid 1px #ffffff',
      borderLeft: 'solid 1px #ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  { name: 'MyRewards' },
);
