import * as React from 'react';

import {
  CompositionChart,
  TokensTableLegend,
  PieChartData,
  CompositionLegend,
  Grid,
} from 'components';
import { TokenAmount } from 'model/entities';
import { tokenAmount } from 'utils/mock';

export const entries = new Array<PieChartData<TokenAmount>>(5).fill({
  value: tokenAmount,
  payload: undefined,
});

function PoolPieChart() {
  return (
    <Grid container spacing={3} wrap="nowrap">
      <Grid item>
        <CompositionChart withBackground chartData={entries} size="medium" />
      </Grid>
      <Grid item>
        <CompositionLegend chartData={entries} Template={TokensTableLegend} />
      </Grid>
    </Grid>
  );
}

export { PoolPieChart };
