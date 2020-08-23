import React, { useCallback } from 'react';
import { makeStyles } from '@akropolis-web/styles';
import { Grid, Box } from '@akropolis-web/components';

export type Props = {
  title: React.ReactNode;
  chart: JSX.Element;
  apyValue: JSX.Element;
  button?: JSX.Element;
};

export function PoolSummaryCard(props: Props) {
  const { title, chart, apyValue, button } = props;
  const classes = useStyles();

  const renderMetric = useCallback(
    () => (
      <div className={classes.metric}>
        <div className={classes.title}>APY</div>
        <div className={classes.apyValue}>{apyValue}</div>
      </div>
    ),
    [apyValue],
  );

  return (
    <Grid container wrap="nowrap" direction="column" spacing={3}>
      <Grid item>{title}</Grid>
      <Grid container item spacing={2}>
        <Grid item>{chart}</Grid>
        <Grid container item xs direction="column">
          <Box clone alignSelf="flex-start">
            <Grid item>{renderMetric()}</Grid>
          </Box>
          {button && <Grid item>{button}</Grid>}
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    metric: {},
    title: {
      fontSize: 16,
      fontWeight: 300,
    },
    apyValue: {
      fontSize: 32,
      fontWeight: 300,
      lineHeight: 'normal',
    },
  }),
  { name: 'PoolSummaryCard' },
);
