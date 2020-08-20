import React from 'react';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenAmount, PercentAmount } from '@akropolis-web/primitives';

import { FormattedAmount, Loading, Table, Grid, TokenIcon } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi, Api } from 'services/api';

type Props = {
  amount: TokenAmount;
  poolAddress: string;
};

function getSupposedAmounts(
  api: Api,
  poolAddress: string,
  amount: TokenAmount,
): Observable<TokenAmount[]> {
  return combineLatest([
    api.investments.getPoolBalance$(poolAddress),
    api.investments.getPoolBalances$(poolAddress),
  ]).pipe(
    map(([poolBalance, poolTokensBalances]) => {
      const amountPercent = poolBalance.isZero()
        ? new PercentAmount(0)
        : new PercentAmount(amount).div(poolBalance).mul(100);

      return poolTokensBalances.map(tokenBalance => tokenBalance.mul(amountPercent).div(100));
    }),
  );
}

export function WithdrawSupposedAmountsTable(props: Props) {
  const { amount, poolAddress } = props;
  const api = useApi();
  const [supposedAmounts, supposedAmountsMeta] = useSubscribable(
    () => getSupposedAmounts(api, poolAddress, amount),
    [api, poolAddress, amount],
  );

  return (
    <Loading meta={supposedAmountsMeta}>
      {supposedAmounts && <Table.Component columns={columns} entries={supposedAmounts} />}
    </Loading>
  );
}

const columns: Array<Table.models.Column<TokenAmount>> = [
  {
    renderTitle: () => 'Assets',
    cellContent: {
      kind: 'simple',
      render: token => (
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <TokenIcon tokenAddress={token.currency.address} />
          </Grid>
          <Grid item>{token.currency.symbol}</Grid>
        </Grid>
      ),
    },
  },
  {
    renderTitle: () => 'Approximate Balance',
    cellContent: {
      kind: 'simple',
      render: token => <FormattedAmount sum={token} variant="plain" />,
    },
  },
];
