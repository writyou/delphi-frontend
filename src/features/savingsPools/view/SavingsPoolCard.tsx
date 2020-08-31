import React from 'react';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as R from 'ramda';

import { useApi } from 'services/api';
import { PoolCard, Loading, DepositLimit, PoolFillingLimit } from 'components';
import { SavingsPool } from 'model/types';
import { routes } from 'app/routes';
import { useSubscribable } from 'utils/react';

import { SavingsPoolLiquidity } from '../data/SavingsPoolLiquidity';
import { UserSavingsPoolBalance } from '../data/UserSavingsPoolBalance';

type Props = {
  pool: SavingsPool;
  content: JSX.Element;
  additionalElement?: JSX.Element;
};

export function SavingsPoolCard({ pool, content, additionalElement }: Props) {
  const { address, poolName, tokens } = pool;
  const api = useApi();

  const isCardActive = useSubscribable(() => api.user.getSavingsPoolBalance$(address), [
    api,
    address,
  ])
    .map(balance => !balance.isZero())
    .getOrElse(R.F);

  const isLinkToMoreInfoDisabled = useSubscribable(() => api.savings.getPoolBalance$(address), [
    api,
    address,
  ])
    .map(balance => balance.isZero())
    .getOrElse(R.T);

  return (
    <PoolCard
      poolName={poolName}
      isCardActive={isCardActive}
      tokens={tokens}
      content={{
        suppliedByUser: {
          content: <UserSavingsPoolBalance poolAddress={address} />,
          customTitle: 'Supplied',
        },
        poolLiquidity: {
          content: <SavingsPoolLiquidity poolAddress={address} variant="plain" />,
        },
        availableForDeposit: <AvailableForDeposit poolAddress={address} />,
        poolFilling: <PoolFilling poolAddress={address} />,
        linkToMoreInfo: {
          to: routes.savings.pool.id.getRedirectPath({ id: pool.address }),
          disabled: isLinkToMoreInfoDisabled,
        },
        actions: {
          triggers: content,
          content: additionalElement,
        },
      }}
    />
  );
}

function AvailableForDeposit(props: { poolAddress: string }) {
  const { poolAddress } = props;
  const api = useApi();
  const availableForDepositRD = useSubscribable(
    () => api.user.getAvailableForDeposit$(poolAddress),
    [api, poolAddress],
  );

  return (
    <Loading data={availableForDepositRD} progressProps={{ width: '100%' }}>
      {availableForDeposit => availableForDeposit && <DepositLimit limit={availableForDeposit} />}
    </Loading>
  );
}

function PoolFilling(props: { poolAddress: string }) {
  const { poolAddress } = props;
  const api = useApi();

  const poolFillingRD = useSubscribable(
    () =>
      combineLatest([
        api.savings.getPoolBalance$(poolAddress),
        api.savings.getPoolCapacity$(poolAddress),
      ]).pipe(
        map(([poolBalance, poolCapacity]) => ({
          poolBalance,
          poolCapacity,
        })),
      ),
    [api, poolAddress],
  );

  return (
    <Loading data={poolFillingRD} progressProps={{ width: '100%' }}>
      {poolFilling =>
        poolFilling.poolCapacity && (
          <PoolFillingLimit capacity={poolFilling.poolCapacity} filled={poolFilling.poolBalance} />
        )
      }
    </Loading>
  );
}
