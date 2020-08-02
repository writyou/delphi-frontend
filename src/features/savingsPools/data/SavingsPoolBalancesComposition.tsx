import * as React from 'react';
import { map } from 'rxjs/operators';

import {
  CompositionChart,
  TokensTableLegend,
  PieChartData,
  CompositionLegend,
  Grid,
  Loading,
} from 'components';
import { TokenAmount } from 'model/entities';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

type Props = {
  poolAddress: string;
};

function SavingsPoolBalancesComposition({ poolAddress }: Props) {
  const api = useApi();
  const [entries, entriesMeta] = useSubscribable(
    () =>
      api.savings.getPoolBalances$(poolAddress).pipe(
        map(balances =>
          balances.map<PieChartData<TokenAmount>>(x => ({ value: x, payload: undefined })),
        ),
      ),
    [api, poolAddress],
  );

  return (
    <Loading meta={entriesMeta}>
      {entries && (
        <Grid container spacing={3} wrap="nowrap">
          <Grid item>
            <CompositionChart withBackground chartData={entries} size="medium" />
          </Grid>
          <Grid item>
            <CompositionLegend chartData={entries} Template={TokensTableLegend} />
          </Grid>
        </Grid>
      )}
    </Loading>
  );
}

export { SavingsPoolBalancesComposition };
