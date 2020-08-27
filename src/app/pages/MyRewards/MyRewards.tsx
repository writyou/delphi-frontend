import * as React from 'react';

import { useApi } from 'services/api';
import { makeStyles } from 'utils/styles';
import { useSubscribable } from 'utils/react';
import { Loading, Grid, Card } from 'components';
import {
  WithdrawRewardsButton,
  TotalRewardsBalance,
  RewardsComposition,
  RewardsTable,
  RewardsClaimRulesMessage,
} from 'features/rewards';
import { PageForGuest, PortfolioBalanceChart } from 'app/components';

export function MyRewards() {
  const classes = useStyles();
  const api = useApi();
  const doesUserExistRD = useSubscribable(() => api.user.isUserExist$(), [api]); // TODO add check pool balances

  return (
    <Card variant="contained" className={classes.root}>
      <Loading data={doesUserExistRD}>
        {doesUserExist =>
          doesUserExist ? (
            <Grid container className={classes.table} spacing={6}>
              <Grid item xs={6}>
                <div className={classes.sectionTitle}>Composition</div>
                <RewardsComposition />
              </Grid>
              <Grid item xs={3}>
                <div className={classes.sectionTitle}>Total NAV</div>
                <div className={classes.totalNav}>
                  <TotalRewardsBalance />
                </div>
              </Grid>
              <Grid item container xs={3} justify="flex-end">
                <div className={classes.withdrawButton}>
                  <WithdrawRewardsButton
                    size="small"
                    color="primary"
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <PortfolioBalanceChart />
              </Grid>
              <Grid item xs={6}>
                <RewardsClaimRulesMessage />
                <div className={classes.rewardsTable}>
                  <RewardsTable />
                </div>
              </Grid>
            </Grid>
          ) : (
            <PageForGuest />
          )
        }
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
    rewardsTable: {
      marginTop: 44,
    },
  }),
  { name: 'MyRewards' },
);
