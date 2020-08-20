import * as React from 'react';
import { LiquidityAmount } from '@akropolis-web/primitives';
import { combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { useApi, Api } from 'services/api';
import { makeStyles } from 'utils/styles';
import {
  Loading,
  Grid,
  Card,
  FormattedAmount,
  ModulesIntroSection,
  PortfolioBalanceChart,
} from 'components';
import { useSubscribable } from 'utils/react';
import { DEFAULT_LIQUIDITY_CURRENCY } from 'utils/mock';
import { getLiquidityAmountsSum } from 'utils/helpers';
import { WithdrawRewardsButton } from 'features/rewards';

import { RewardsTable, TableData, Order } from './RewardsTable';
import { RewardsComposition } from './RewardsComposition';

function makeChartData(entries: TableData | undefined) {
  return (entries || []).map(order => ({
    value: order.NAV,
    payload: order.amount,
  }));
}

// TODO calculate in api.user.getTotalRewardsBalance(): Observable<LiquidityAmount>
function getTotalNav(entries: TableData | undefined) {
  return getLiquidityAmountsSum((entries || []).map(e => e.NAV));
}

function getRewardsData$(api: Api) {
  return api.user.getRewards$().pipe(
    map(rewards => rewards.filter(a => !a.isZero())),
    switchMap(rewards =>
      rewards.length
        ? combineLatest(rewards.map(a => api.prices.getTokenPrice$(a.currency.address))).pipe(
            map(prices =>
              rewards.map(
                (amount, i): Order => ({
                  amount,
                  NAV: new LiquidityAmount(amount.mul(prices[i]), DEFAULT_LIQUIDITY_CURRENCY),
                }),
              ),
            ),
          )
        : of([]),
    ),
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
              {/* TODO move to features/rewards/data */}
              <RewardsComposition data={makeChartData(tableEntries)} />{' '}
            </Grid>
            <Grid item xs={3}>
              <div className={classes.sectionTitle}>Total NAV</div>
              <div className={classes.totalNav}>
                {/* TODO move to features/rewards/data */}
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
              <PortfolioBalanceChart isUserLoggedIn />
            </Grid>
            <Grid item xs={6}>
              {tableEntries && <RewardsTable data={tableEntries} />}
            </Grid>
          </Grid>
        ) : (
          <ModulesIntroSection />
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
  }),
  { name: 'MyRewards' },
);
