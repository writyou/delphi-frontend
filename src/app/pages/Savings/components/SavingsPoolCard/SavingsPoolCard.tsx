import React from 'react';
import { Observable } from 'rxjs';

import { useApi } from 'services/api';
import { PoolCard } from 'components';
import { SavingsPool } from 'model/types';
import { SavingsPoolLiquidity, UserSavingsPoolBalance } from 'features/savingsPools';
import { routes } from 'app/routes';
import { Amount } from 'model/entities';

type Props = {
  pool: SavingsPool;
  content: JSX.Element;
  additionalElement?: JSX.Element;
  getDepositLimit$?(poolAddress: string): Observable<Amount | null>;
};

export function SavingsPoolCard({ pool, content, additionalElement, getDepositLimit$ }: Props) {
  const { address, poolName, tokens } = pool;
  const api = useApi();
  return (
    <PoolCard
      address={address}
      poolName={poolName}
      tokens={tokens}
      link={routes.savings.pool.id.getRedirectPath({ id: pool.address })}
      content={content}
      getDepositLimit$={getDepositLimit$}
      additionalElement={additionalElement}
      poolBalance={<UserSavingsPoolBalance poolAddress={address} />}
      poolLiquidity={<SavingsPoolLiquidity poolAddress={address} />}
      getUserBalance$={(s: string) => api.user.getSavingsPoolBalance$(s)}
    />
  );
}
