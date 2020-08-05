import * as React from 'react';

import { CompositionChart, TokensTableLegend, CompositionLegend, Grid, Loading } from 'components';
import { getMockCompositionChartEntriesToken } from 'utils/mock';

type Props = {
  poolsNumber: number;
};

function RewardCompositionChartMock({ poolsNumber }: Props) {
  return (
    <Loading>
      <Grid container spacing={3} wrap="nowrap">
        <Grid item>
          <CompositionChart
            withBackground
            chartData={getMockCompositionChartEntriesToken(poolsNumber)}
            size="medium"
          />
        </Grid>
        <Grid item>
          <CompositionLegend
            chartData={getMockCompositionChartEntriesToken(poolsNumber)}
            Template={TokensTableLegend}
          />
        </Grid>
      </Grid>
    </Loading>
  );
}

export { RewardCompositionChartMock };
