import React from 'react';
import { Observable } from 'rxjs';
import { Amount } from '@akropolis-web/primitives';

import { useApi } from 'services/api';
import { PoolCard } from 'components';
import { SavingsPool } from 'model/types';
import { routes } from 'app/routes';
import { useSubscribable } from 'utils/react';

import { InvestmentsPoolLiquidity } from '../data/InvestmentsPoolLiquidity';
import { UserInvestmentsPoolBalance } from '../data/UserInvestmentsPoolBalance';

type Props = {
  pool: SavingsPool;
  content: JSX.Element;
  additionalElement?: JSX.Element;
  getDepositLimit$?(poolAddress: string): Observable<Amount | null>;
};

export function InvestmentsPoolCard({ pool, content, additionalElement, getDepositLimit$ }: Props) {
  const { address, poolName, tokens } = pool;
  const api = useApi();
  const [poolBalance, poolBalanceMeta] = useSubscribable(
    () => api.investments.getPoolBalance$(address),
    [api, address],
  );
  return (
    <PoolCard
      address={address}
      poolName={poolName}
      tokens={tokens}
      link={routes.investments.pool.id.getRedirectPath({ id: pool.address })}
      isDisabledLink={!poolBalanceMeta.loaded || (!!poolBalance && poolBalance.isZero())}
      content={content}
      getDepositLimit$={getDepositLimit$}
      additionalElement={additionalElement}
      poolBalance={<UserInvestmentsPoolBalance poolAddress={address} />}
      poolBalanceTitle="Supplied"
      poolLiquidity={<InvestmentsPoolLiquidity poolAddress={address} variant="plain" />}
      getUserBalance$={(s: string) => api.user.getInvestmentsPoolBalance$(s)}
    />
  );
}
