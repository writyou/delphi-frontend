import React from 'react';

import { useApi } from 'services/api';
import { PoolCard } from 'components';
import { SavingsPool } from 'model/types';
import { SavingsPoolLiquidity, UserSavingsPoolBalance } from 'features/savingsPools';
import { routes } from 'app/routes';

type Props = {
  pool: SavingsPool;
  content: JSX.Element;
  additionalElement?: JSX.Element;
};

export function SavingsPoolCard({ pool, content, additionalElement }: Props) {
  const { address, poolName, tokens } = pool;
  const api = useApi();
  return (
    <PoolCard
      address={address}
      poolName={poolName}
      tokens={tokens}
      link={routes.savings.pool.id.getRedirectPath({ id: pool.address })}
      content={content}
      additionalElement={additionalElement}
      poolBalance={<UserSavingsPoolBalance poolAddress={address} />}
      poolLiquidity={<SavingsPoolLiquidity poolAddress={address} />}
      getPoolBalance={() => api.user.getSavingsPoolBalance$(address)}
    />
  );
}
