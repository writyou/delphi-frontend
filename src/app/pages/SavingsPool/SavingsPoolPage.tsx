import React from 'react';
import { useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { PercentAmount } from '@akropolis-web/primitives';

import { makeStyles } from 'utils/styles';
import { Back, MoreIcon } from 'components/icons';
import { Grid, Metric, IconButton, Hint, Loading, FormattedAmount, Card, Box } from 'components';
import { routes } from 'app/routes';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import {
  SavingsPoolLiquidity,
  UserSavingsPoolBalance,
  WithdrawFromSavingsPoolButton,
  DepositToSavingsPoolForm,
  SavingsPoolBalancesComposition,
  SavingsPoolDepositLimit,
  RewardWeeklyCompositionChart,
  SavingsPoolCapacity,
} from 'features/savingsPools';
import { MAX_AVG_APY } from 'env';

export function SavingsPoolPage() {
  const match = useRouteMatch<{ id: string }>(routes.savings.pool.id.getRoutePath());
  const poolAddress = match ? match.params.id : null;

  if (!poolAddress) {
    return <Hint>404 Page not found</Hint>;
  }

  const api = useApi();
  const poolRD = useSubscribable(() => api.savings.getPool$(poolAddress), [api, poolAddress]);

  const history = useHistory();
  const classes = useStyles();

  return (
    <Loading data={poolRD}>
      {pool => (
        <Card variant="contained" className={classes.root}>
          {pool ? (
            <Grid container direction="column">
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Grid container alignItems="center">
                    <IconButton size="small" onClick={handleBackOnClick}>
                      <Back />
                    </IconButton>
                    <div className={classes.poolTitle}>{pool.poolName}</div>
                  </Grid>
                </Grid>
                <Grid item>
                  <WithdrawFromSavingsPoolButton
                    size="small"
                    color="primary"
                    variant="outlined"
                    pool={pool}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.row}>
                <Grid item xs={6} className={classes.paddingRight}>
                  <Grid container justify="space-between">
                    <Metric
                      title="Pool Liquidity"
                      value={<SavingsPoolLiquidity poolAddress={poolAddress} />}
                    />
                    <Metric
                      title="APY"
                      value={
                        pool.apy.lt(MAX_AVG_APY) ? (
                          <FormattedAmount sum={pool.apy} />
                        ) : (
                          <Box display="inline-flex" alignItems="center" flexWrap="nowrap">
                            <MoreIcon className={classes.arrow} />
                            <FormattedAmount sum={new PercentAmount(MAX_AVG_APY)} />
                          </Box>
                        )
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className={cn(classes.withBorder, classes.row)}>
                <Grid container item xs={6} className={classes.paddingRight} direction="column">
                  <Metric
                    title="Approximate Reward Weekly"
                    value={
                      <div className={classes.metricChart}>
                        <RewardWeeklyCompositionChart poolAddress={poolAddress} />
                      </div>
                    }
                  />
                </Grid>
                <Grid container item xs={4} direction="column">
                  <Metric
                    title="Currency Reserves"
                    value={
                      <div className={classes.metricChart}>
                        <SavingsPoolBalancesComposition poolAddress={poolAddress} />
                      </div>
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item container xs={4} spacing={2}>
                  <Grid item xs={12}>
                    <Metric
                      title="My Supply Balance"
                      value={<UserSavingsPoolBalance poolAddress={poolAddress} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SavingsPoolCapacity poolAddress={poolAddress} />
                    <div className={classes.depositLimit}>
                      <SavingsPoolDepositLimit poolAddress={poolAddress} />
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <DepositToSavingsPoolForm pool={pool} />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Hint>Savings pool with address &quot;{poolAddress}&quot; not found</Hint>
          )}
        </Card>
      )}
    </Loading>
  );

  function handleBackOnClick() {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push(routes.savings.getRedirectPath());
    }
  }
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: '30px 50px',
      minHeight: '100%',
    },
    poolTitle: {
      color: 'white',
      borderRadius: 11,
      backgroundImage: 'linear-gradient(to right, #6a2dba 0%, #6e34ce 100%)',
      padding: '0 10px',
      marginLeft: 35,
    },
    paddingRight: {
      paddingRight: 163,
    },
    withBorder: {
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: 45,
      marginBottom: 30,
    },
    row: {
      paddingTop: 50,
    },
    metricChart: {
      marginTop: 5,
      width: '100%',
    },
    depositLimit: {
      fontSize: 12,
      marginTop: 8,
    },
    arrow: {
      marginRight: '0.45em',
      fontSize: '0.45em',
    },
  }),
  { name: 'SavingsPoolPage' },
);
