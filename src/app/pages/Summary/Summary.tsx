import React from 'react';

import { useApi } from 'services/api';
import { useSubscribableDeprecated } from 'utils/react';
import { Loading, Card, Grid } from 'components';
import { makeStyles } from 'utils/styles';
import { PageForGuest, PortfolioBalanceChart } from 'app/components';

import { APYMetricsSection } from './Components/APYMetricsSection';

export function Summary() {
  const classes = useStyles();

  const api = useApi();
  const [isUserExist, userMeta] = useSubscribableDeprecated(() => api.user.isUserExist$(), [api]);

  return (
    <Card variant="contained" className={classes.root}>
      <Loading meta={userMeta}>
        {isUserExist ? (
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <PortfolioBalanceChart />
            </Grid>
            <Grid item xs={6}>
              <APYMetricsSection />
            </Grid>
          </Grid>
        ) : (
          <PageForGuest />
        )}
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
