import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { Loading, ModalButton } from 'components';
import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';

import { SavingsPoolCard, WithViewDetails } from './SavingsPoolCard/SavingsPoolCard';
import { WithdrawForm } from './WithdrawForm';

export function WithdrawTab() {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();
  const [pools, poolsMeta] = useSubscribable(() => api.savings.getPools$(), [api]); // mocked

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
                        <ModalButton
                          modalType="dialog"
                          color="primary"
                          variant="outlined"
                          content={t(tKeys.modules.savings.withdraw.getKey())}
                        >
                          <WithdrawForm poolAddress={pool.address} supportedTokens={pool.tokens} />
                        </ModalButton>
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
