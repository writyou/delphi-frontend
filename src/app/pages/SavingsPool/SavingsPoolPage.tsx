import React from 'react';
import { useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';
import { Back } from 'components/icons';
import { Grid, Metric, IconButton, Hint, Loading, FormattedAmount, Label } from 'components';
import { routes } from 'app/routes';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import {
  SavingsPoolLiquidity,
  UserSavingsPoolBalance,
  WithdrawFromSavingsPoolButton,
  DepositToSavingsPoolForm,
  SavingsPoolBalancesComposition,
} from 'features/savingsPools';

import { RewardCompositionChartMock } from './RewardCompositionChartMock';

export function SavingsPoolPage() {
  const match = useRouteMatch<{ id: string }>(routes.savings.pool.id.getRoutePath());
  const poolAddress = match ? match.params.id : null;

  if (!poolAddress) {
    return <Hint>404 Page not found</Hint>;
  }

  const api = useApi();
  const [pool, poolMeta] = useSubscribable(() => api.savings.getPool$(poolAddress), [
    api,
    poolAddress,
  ]);

  const history = useHistory();
  const classes = useStyles();

  return (
    <Loading meta={poolMeta}>
      {pool ? (
        <Grid container direction="column" className={classes.root}>
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
                <Metric title="APY" value={<FormattedAmount sum={pool.apy} />} />
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={cn(classes.withBorder, classes.row)}>
            <Grid container item xs={6} className={classes.paddingRight}>
              <Metric
                title={<Label withComingSoon>Approximate Reward Weekly</Label>}
                value={<RewardCompositionChartMock poolsNumber={3} />}
              />
            </Grid>
            <Grid container item xs={4}>
              <Metric
                title="Currency Reserves"
                value={<SavingsPoolBalancesComposition poolAddress={poolAddress} />}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Metric
                title="My Supply Balance"
                value={<UserSavingsPoolBalance poolAddress={poolAddress} />}
              />
            </Grid>
            <Grid item xs={6}>
              <DepositToSavingsPoolForm pool={pool} />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Hint>Savings pool with address &quot;{poolAddress}&quot; not found</Hint>
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
  }),
  { name: 'SavingsPoolPage' },
);
