import React from 'react';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading, Card, Grid, ModulesIntroSection, PortfolioBalanceChart } from 'components';
import { makeStyles } from 'utils/styles';

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
            {user ? <APYMetricsSection /> : <ModulesIntroSection />}
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
