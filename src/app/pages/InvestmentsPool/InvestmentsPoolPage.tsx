import React from 'react';
import { useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';
import { Back } from 'components/icons';
import { Grid, Metric, IconButton, Hint, Loading, FormattedAmount, Label, Card } from 'components';
import { routes } from 'app/routes';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import {
  InvestmentsPoolLiquidity,
  UserInvestmentsPoolBalance,
  WithdrawFromInvestmentsPoolButton,
  DepositToInvestmentsPoolForm,
  InvestmentsPoolBalancesComposition,
  InvestmentsPoolDepositLimit,
} from 'features/investments';

import { RewardCompositionChartMock } from './RewardCompositionChartMock';

export function InvestmentsPoolPage() {
  const match = useRouteMatch<{ id: string }>(routes.investments.pool.id.getRoutePath());
  const poolAddress = match ? match.params.id : null;

  if (!poolAddress) {
    return <Hint>404 Page not found</Hint>;
  }

  const api = useApi();
  const [pool, poolMeta] = useSubscribable(() => api.investments.getPool$(poolAddress), [
    api,
    poolAddress,
  ]);

  const history = useHistory();
  const classes = useStyles();

  return (
    <Loading meta={poolMeta}>
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
                <WithdrawFromInvestmentsPoolButton
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
                    value={<InvestmentsPoolLiquidity poolAddress={poolAddress} />}
                  />
                  <Metric title="APY" value={<FormattedAmount sum={pool.apy} />} />
                </Grid>
              </Grid>
            </Grid>
            <Grid container className={cn(classes.withBorder, classes.row)}>
              <Grid container item xs={6} className={classes.paddingRight} direction="column">
                <Metric
                  title={<Label withComingSoon>Approximate Reward Weekly</Label>}
                  value={
                    <div className={classes.metricChart}>
                      <RewardCompositionChartMock poolsNumber={3} />
                    </div>
                  }
                />
              </Grid>
              <Grid container item xs={4} direction="column">
                <Metric
                  title="Currency Reserves"
                  value={
                    <div className={classes.metricChart}>
                      <InvestmentsPoolBalancesComposition poolAddress={poolAddress} />
                    </div>
                  }
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Metric
                  title="My Supply Balance"
                  value={<UserInvestmentsPoolBalance poolAddress={poolAddress} />}
                />
                <div className={classes.depositLimit}>
                  <InvestmentsPoolDepositLimit poolAddress={poolAddress} />
                </div>
              </Grid>
              <Grid item xs={6}>
                <DepositToInvestmentsPoolForm pool={pool} />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Hint>Investments pool with address &quot;{poolAddress}&quot; not found</Hint>
        )}
      </Card>
    </Loading>
  );

  function handleBackOnClick() {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push(routes.investments.getRedirectPath());
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
    },
  }),
  { name: 'InvestmentsPoolPage' },
);
