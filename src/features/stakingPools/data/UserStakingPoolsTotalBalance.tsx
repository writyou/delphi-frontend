import React from 'react';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { LiquidityAmount } from '@akropolis-web/primitives';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { DEFAULT_LIQUIDITY_CURRENCY } from 'utils/mock';

const reduceLiquidityAmounts = map<LiquidityAmount[], LiquidityAmount>(balances =>
  balances.reduce((acc, cur) => acc.add(cur), new LiquidityAmount(0, DEFAULT_LIQUIDITY_CURRENCY)),
);

export function UserStakingPoolsTotalBalance() {
  const api = useApi();
  const totalBalanceRD = useSubscribable(
    () =>
      api.user.getMyStakingPools$().pipe(
        switchMap(pools =>
          combineLatest(
            pools.map(pool =>
              api.user
                .getFullStakingPoolBalance$(pool.address)
                .pipe(
                  switchMap(balance =>
                    api.prices
                      .getTokenPrice$(balance.currency.address)
                      .pipe(
                        map(
                          price =>
                            new LiquidityAmount(balance.mul(price), DEFAULT_LIQUIDITY_CURRENCY),
                        ),
                      ),
                  ),
                ),
            ),
          ),
        ),
        reduceLiquidityAmounts,
      ),
    [api],
  );

  return (
    <Loading data={totalBalanceRD}>
      {totalBalance => <FormattedAmount sum={totalBalance} variant="plain" />}
    </Loading>
  );
}
