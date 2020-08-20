import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { Loading, Hint, Grid, Button } from 'components';
import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';
import { WithdrawFromSavingsPoolButton, SavingsPoolCard } from 'features/savingsPools';

export function WithdrawTab() {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();
  const [pools, poolsMeta] = useSubscribable(() => api.user.getMySavingsPools$(), [api]);

  return (
    <>
      <Loading meta={poolsMeta}>
        {pools && pools.length ? (
          <>
            <div className={classes.withdrawTabDescription}>
              {t(tKeys.modules.savings.withdrawTabText.getKey())}
            </div>
            <Grid container alignItems="flex-start" spacing={3}>
              {pools.map(pool => (
                <Grid key={pool.address} item xs={4}>
                  <SavingsPoolCard
                    pool={pool}
                    content={
                      <WithdrawFromSavingsPoolButton
                        size="small"
                        color="primary"
                        variant="outlined"
                        pool={pool}
                      />
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Hint
            button={
              <Button
                component={RouterLink}
                to={routes.savings.getRedirectPath()}
                size="small"
                color="primary"
                variant="contained"
              >
                Save
              </Button>
            }
          >
            You don’t have any active savings pools yet.
          </Hint>
        )}
      </Loading>
    </>
  );
}

const useStyles = makeStyles(() => ({
  withdrawTabDescription: {
    marginBottom: 40,
  },
}));
