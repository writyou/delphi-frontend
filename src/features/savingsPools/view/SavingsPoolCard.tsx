import React, { useCallback } from 'react';
import { Observable } from 'rxjs';
import { Amount } from '@akropolis-web/primitives';

import { useApi } from 'services/api';
import { PoolCard } from 'components';
import { SavingsPool } from 'model/types';
import { routes } from 'app/routes';
import { useSubscribable } from 'utils/react';
import { isSuccess } from 'utils/remoteData';

import { SavingsPoolLiquidity } from '../data/SavingsPoolLiquidity';
import { UserSavingsPoolBalance } from '../data/UserSavingsPoolBalance';

type Props = {
  pool: SavingsPool;
  content: JSX.Element;
  additionalElement?: JSX.Element;
  getDepositLimit$?(poolAddress: string): Observable<Amount | null>;
};

export function SavingsPoolCard({ pool, content, additionalElement, getDepositLimit$ }: Props) {
  const { address, poolName, tokens } = pool;
  const api = useApi();
  const poolBalanceRD = useSubscribable(() => api.savings.getPoolBalance$(address), [api, address]);
  return (
    <PoolCard
      address={address}
      poolName={poolName}
      tokens={tokens}
      link={routes.savings.pool.id.getRedirectPath({ id: pool.address })}
      isDisabledLink={
        !isSuccess(poolBalanceRD) ||
        poolBalanceRD.fold(
          () => undefined,
          () => undefined,
          () => undefined,
          balance => balance.isZero(),
        )
      }
      content={content}
      getDepositLimit$={getDepositLimit$}
      additionalElement={additionalElement}
      poolBalance={<UserSavingsPoolBalance poolAddress={address} />}
      poolBalanceTitle="Supplied"
      poolLiquidity={<SavingsPoolLiquidity poolAddress={address} variant="plain" />}
      getUserBalance$={useCallback((s: string) => api.user.getSavingsPoolBalance$(s), [api])}
      getPoolBalance$={useCallback((s: string) => api.savings.getPoolBalance$(s), [api])}
      getPoolCapacity$={useCallback((s: string) => api.savings.getPoolCapacity$(s), [api])}
    />
  );
}
