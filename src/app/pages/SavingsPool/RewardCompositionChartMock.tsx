import * as React from 'react';

import { CompositionChart, TokensTableLegend, CompositionLegend, Grid, Loading } from 'components';
import { getMockCompositionChartEntriesToken } from 'utils/mock';
import { makeStyles } from 'utils/styles';

type Props = {
  poolsNumber: number;
};

function RewardCompositionChartMock({ poolsNumber }: Props) {
  const classes = useStyles();

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
        <Grid item className={classes.legend}>
          <CompositionLegend
            chartData={getMockCompositionChartEntriesToken(poolsNumber)}
            Template={TokensTableLegend}
          />
        </Grid>
      </Grid>
    </Loading>
  );
}

const useStyles = makeStyles(
  () => ({
    legend: {
      fontSize: 16,
    },
  }),
  { name: 'RewardCompositionChart' },
);

export { RewardCompositionChartMock };
