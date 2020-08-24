import React from 'react';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { DeprecatedLoading, PoolFillingLimit } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';

export function SavingsPoolCapacity({ poolAddress }: { poolAddress: string }) {
  const api = useApi();

  const [poolFilling, poolFillingMeta] = useSubscribableDeprecated(
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
    <DeprecatedLoading meta={poolFillingMeta}>
      {poolFilling && poolFilling.poolCapacity && (
        <PoolFillingLimit capacity={poolFilling.poolCapacity} filled={poolFilling.poolBalance} />
      )}
    </DeprecatedLoading>
  );
}
