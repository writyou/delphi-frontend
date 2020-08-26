import React from 'react';
import { Grid, Metric } from '@akropolis-web/components';

export type Props = {
  title: React.ReactNode;
  chart: JSX.Element;
  apyValue: JSX.Element;
  button?: JSX.Element;
};

export function PoolSummaryCard(props: Props) {
  const { title, chart, apyValue, button } = props;

  return (
    <Grid container wrap="nowrap" direction="column" spacing={3}>
      <Grid item>{title}</Grid>
      <Grid container item spacing={2}>
        <Grid item>{chart}</Grid>
        <Grid container item xs direction="column">
          <Grid item>
            <Metric title="APY" value={apyValue} variant="condensed" />
          </Grid>
          {button && <Grid item>{button}</Grid>}
        </Grid>
      </Grid>
    </Grid>
  );
}
