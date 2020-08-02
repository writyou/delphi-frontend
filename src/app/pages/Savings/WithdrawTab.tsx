import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { Loading } from 'components';
import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';
import { WithdrawFromSavingsPoolButton } from 'features/savingsPools';

import { SavingsPoolCard, WithViewDetails } from './SavingsPoolCard/SavingsPoolCard';

export function WithdrawTab() {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();
  const [pools, poolsMeta] = useSubscribable(() => api.user.getMySavingsPools$(), [api]);

  return (
    <>
      <div className={classes.withdrawTabDescription}>
        {t(tKeys.modules.savings.withdrawTabText.getKey())}
      </div>
      <Loading meta={poolsMeta}>
        <Grid container alignItems="flex-start" spacing={3}>
          {pools &&
            pools.map(pool => (
              <Grid key={pool.address} item xs={4}>
                <SavingsPoolCard
                  pool={pool}
                  footerElement={
                    <WithViewDetails
                      link={routes.savings.pool.id.getRedirectPath({ id: pool.address })}
                      content={
                        <WithdrawFromSavingsPoolButton
                          size="small"
                          color="primary"
                          variant="outlined"
                          pool={pool}
                        />
                      }
                    />
                  }
                />
              </Grid>
            ))}
        </Grid>
      </Loading>
    </>
  );
}

const useStyles = makeStyles(() => ({
  withdrawTabDescription: {
    marginBottom: 40,
  },
}));
