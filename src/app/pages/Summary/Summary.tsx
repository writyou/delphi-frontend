import React from 'react';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { Loading, Card } from 'components';
import { makeStyles } from 'utils/styles';

import { SummaryPage } from './SummaryPage';

export function Summary() {
  const classes = useStyles();

  const api = useApi();
  const [user, userMeta] = useSubscribable(() => api.user.getUser$(), [api]);

  return (
    <Card variant="contained" className={classes.root}>
      <Loading meta={userMeta}>{user ? <SummaryPage /> : <SummaryPage />}</Loading>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    padding: 50,
    minHeight: '100%',
  },
});
