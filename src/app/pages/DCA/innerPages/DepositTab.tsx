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
                  address={pool.address}
                  poolName={pool.poolName}
                  tokens={pool.tokens}
                  isDisabledLink
                  link={routes.savings.pool.id.getRedirectPath({ id: pool.address })}
                  content={<DCADepositCardButtons pool={pool} />}
                  poolBalance={<UserDCAPoolBalance poolAddress={pool.address} />}
                  poolLiquidity={<DCAPoolLiquidity poolAddress={pool.address} />}
                  getUserBalance$={(s: string) => api.user.getDCAPoolBalance$(s)}
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
