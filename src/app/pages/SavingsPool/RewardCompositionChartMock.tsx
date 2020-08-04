import * as React from 'react';

import { CompositionChart, TokensTableLegend, CompositionLegend, Grid, Loading } from 'components';
import { compositionChartEntriesToken } from 'utils/mock';

function RewardCompositionChartMock() {
  return (
    <Loading>
      <Grid container spacing={3} wrap="nowrap">
        <Grid item>
          <CompositionChart
            withBackground
            chartData={compositionChartEntriesToken(3)}
            size="medium"
          />
        </Grid>
        <Grid item>
          <CompositionLegend
            chartData={compositionChartEntriesToken(3)}
            Template={TokensTableLegend}
          />
        </Grid>
      </Grid>
    </Loading>
  );
}

export { RewardCompositionChartMock };
