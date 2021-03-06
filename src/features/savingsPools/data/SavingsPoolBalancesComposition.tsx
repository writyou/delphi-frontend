import * as React from 'react';
import { map } from 'rxjs/operators';
import { TokenAmount } from '@akropolis-web/primitives';

import {
  CompositionChart,
  CompositionChartSkeleton,
  TokensTableLegend,
  PieChartData,
  CompositionLegend,
  Grid,
  Loading,
} from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { makeStyles } from 'utils/styles';

type Props = {
  poolAddress: string;
};

function SavingsPoolBalancesComposition({ poolAddress }: Props) {
  const api = useApi();
  const classes = useStyles();

  const entriesRD = useSubscribable(
    () =>
      api.savings.getPoolBalances$(poolAddress).pipe(
        map(balances =>
          balances.map<PieChartData<TokenAmount>>(x => ({ value: x, payload: undefined })),
        ),
      ),
    [api, poolAddress],
  );

  return (
    <Loading data={entriesRD} loader={<CompositionChartSkeleton size="medium" />}>
      {entries => (
        <Grid container spacing={3} wrap="nowrap">
          <Grid item>
            <CompositionChart withBackground chartData={entries} size="medium" />
          </Grid>
          <Grid item className={classes.legend} xs>
            <CompositionLegend
              chartData={entries}
              Template={props => (
                <TokensTableLegend<TokenAmount> getTokenAmount={x => x.pieData.value} {...props} />
              )}
            />
          </Grid>
        </Grid>
      )}
    </Loading>
  );
}

const useStyles = makeStyles(
  () => ({
    legend: {
      fontSize: 16,
    },
  }),
  { name: 'SavingsPoolBalancesComposition' },
);

export { SavingsPoolBalancesComposition };
