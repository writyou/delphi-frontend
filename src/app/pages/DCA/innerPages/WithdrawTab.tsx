import * as React from 'react';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { Grid, DeprecatedLoading, PoolCard } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { routes } from 'app/routes';
import { DCAPoolLiquidity, UserDCAPoolBalance } from 'features/DCAPools';

import { DCAWithdrawCardButtons } from '../components/DCAWithdrawCardButtons';

export function WithdrawTab() {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();
  const [pools, poolsMeta] = useSubscribableDeprecated(() => api.dca.getPools$(), [api]);

  return (
    <>
      <div className={classes.description}>{t(tKeys.modules.dca.description.getKey())}</div>
      <DeprecatedLoading meta={poolsMeta}>
        <Grid container alignItems="flex-start" spacing={3}>
          {pools &&
            pools.length &&
            pools.map(pool => (
              <Grid key={pool.address} item xs={4}>
                <PoolCard
                  address={pool.address}
                  poolName={pool.poolName}
                  tokens={pool.tokens}
                  isDisabledLink
                  link={routes.savings.pool.id.getRedirectPath({ id: pool.address })}
                  content={<DCAWithdrawCardButtons pool={pool} />}
                  poolBalance={<UserDCAPoolBalance poolAddress={pool.address} />}
                  poolLiquidity={<DCAPoolLiquidity poolAddress={pool.address} />}
                  getUserBalance$={(s: string) => api.user.getDCAPoolBalance$(s)}
                />
              </Grid>
            ))}
        </Grid>
      </DeprecatedLoading>
    </>
  );
}

const useStyles = makeStyles(
  () => ({
    description: {
      marginBottom: 40,
    },
  }),
  { name: 'WithdrawTab' },
);
