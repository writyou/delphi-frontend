import React from 'react';

import { FormattedAmount, Loading, NewTable, Grid, TokenIcon } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { TokenAmount } from 'model/entities';

type Props = {
  amount: TokenAmount;
  poolAddress: string;
};

export function WithdrawSupposedAmountsTable(props: Props) {
  const { amount, poolAddress } = props;
  const api = useApi();
  const [poolBalance, poolBalanceMeta] = useSubscribable(
    () => api.savings.getPoolBalance$(poolAddress),
    [api, poolAddress],
  );

  const [poolTokensBalances, poolTokensBalancesMeta] = useSubscribable(
    () => api.savings.getPoolBalances$(poolAddress),
    [api, poolAddress],
  );

  const balancePercent = poolBalance && amount.div(poolBalance).mul(100);

  const entries = poolTokensBalances?.map(
    pool => balancePercent && pool.mul(balancePercent).div(100),
  );

  return (
    <Loading meta={[poolBalanceMeta, poolTokensBalancesMeta]}>
      {entries && <NewTable.Component columns={columns} entries={entries} />}
    </Loading>
  );
}

const columns: Array<NewTable.models.Column<TokenAmount>> = [
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
