import React from 'react';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading, Card, Grid, PoolsIntroSection } from 'components';
import { makeStyles } from 'utils/styles';

import { PortfolioBalanceChart } from './Components/PortfolioBalanceChart';
import { APYMetricsSection } from './Components/APYMetricsSection';

export function Summary() {
  const classes = useStyles();

  const api = useApi();
  const [user, userMeta] = useSubscribable(() => api.user.getUser$(), [api]);

  return (
    <Card variant="contained" className={classes.root}>
      <Loading meta={userMeta}>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <PortfolioBalanceChart isUserLoggedIn={!!user} />
          </Grid>
          <Grid item xs={6}>
            {user ? <APYMetricsSection /> : <PoolsIntroSection />}
          </Grid>
        </Grid>
      </Loading>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    padding: 50,
    minHeight: '100%',
  },
});
