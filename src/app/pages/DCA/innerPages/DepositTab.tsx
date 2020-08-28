import * as React from 'react';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { Grid, Loading, PoolCard } from 'components';
import { useSubscribable } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { routes } from 'app/routes';
import { DCAPoolLiquidity, UserDCAPoolBalance } from 'features/DCAPools';

import { DCADepositCardButtons } from '../components/DCADepositCardButtons';

export function DepositTab() {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();
  const poolsRD = useSubscribable(() => api.dca.getPools$(), [api]);

  return (
    <>
      <div className={classes.description}>{t(tKeys.modules.dca.description.getKey())}</div>
      <Loading data={poolsRD}>
        {pools => (
          <Grid container alignItems="flex-start" spacing={3}>
            {pools.map(pool => (
              <Grid key={pool.address} item xs={4}>
                <PoolCard
                  poolName={pool.poolName}
                  tokens={pool.tokens}
                  content={{
                    suppliedByUser: {
                      content: <UserDCAPoolBalance poolAddress={pool.address} />,
                    },
                    poolLiquidity: {
                      content: <DCAPoolLiquidity poolAddress={pool.address} />,
                    },
                    linkToMoreInfo: {
                      to: routes.savings.pool.id.getRedirectPath({ id: pool.address }),
                      disabled: true,
                    },
                    actions: {
                      triggers: <DCADepositCardButtons pool={pool} />,
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Loading>
    </>
  );
}

const useStyles = makeStyles(
  () => ({
    description: {
      marginBottom: 40,
    },
  }),
  { name: 'DepositTab' },
);
