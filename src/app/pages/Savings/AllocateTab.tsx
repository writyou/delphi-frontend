import React from 'react';

import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { SwitchInput } from 'components/inputs';
import { Loading, Grid } from 'components';
import { routes } from 'app/routes';

import { SavingsPoolCard, WithViewDetails } from './SavingsPoolCard/SavingsPoolCard';
import { DepositToPoolForm } from '../Demo/components/DepositToPoolForm';

export function AllocateTab() {
  const api = useApi();
  const [pools, poolsMeta] = useSubscribable(() => api.savings.getPools$(), [api]);
  return (
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
                      <span>
                        <SwitchInput />
                        Allocate
                      </span>
                    }
                    additionalElement={
                      <DepositToPoolForm poolAddress={pool.address} supportedTokens={pool.tokens} />
                    }
                  />
                }
              />
            </Grid>
          ))}
      </Grid>
    </Loading>
  );
}
