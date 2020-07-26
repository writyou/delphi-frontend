import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouteMatch } from 'react-router';

import { makeStyles } from 'utils/styles';

export function PoolSavingsPage() {
  const match = useRouteMatch<{ id: string }>('/savings/:id');
  const id = match ? match.params.id : null;

  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container justify="space-between">
        <Grid item>{id}</Grid>
        <Grid item>withdraw</Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          pool
        </Grid>
        <Grid item xs={5}>
          trade
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          reward
        </Grid>
        <Grid item xs={5}>
          reserves
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          balance
        </Grid>
        <Grid item xs={5}>
          allocate
        </Grid>
        <Grid item xs={2}>
          unlock
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: '30px 50px',
    },
  }),
  { name: 'PoolSavingsPage' },
);
