import React from 'react';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading, Card, Grid } from 'components';
import { makeStyles } from 'utils/styles';
import { PageForGuest, PortfolioBalanceChart } from 'app/components';
import { useBreakpointsMatch } from 'services/adaptability';

import { APYMetricsSection } from './Components/APYMetricsSection';

export function Summary() {
  const classes = useStyles();

  const api = useApi();
  const isMobile = useBreakpointsMatch({ to: 'tabletXS' });
  const doesUserExistRD = useSubscribable(() => api.user.isUserExist$(), [api]);

  return (
    <Card variant="contained" className={classes.root}>
      <Loading data={doesUserExistRD}>
        {doesUserExist =>
          doesUserExist ? (
            <Grid container spacing={isMobile ? 0 : 10}>
              <Grid item xs={isMobile ? 12 : 6}>
                <PortfolioBalanceChart />
              </Grid>
              <Grid item xs={isMobile ? 12 : 6}>
                <APYMetricsSection />
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
  theme => ({
    root: {
      minHeight: '100%',

      padding: 10,
      [theme.breakpoints.up('tabletXS')]: {
        padding: 50,
      },
    },
  }),
  { name: 'Summary' },
);
