import React from 'react';
import { Grid, Metric } from '@akropolis-web/components';
import { makeStyles } from '@akropolis-web/styles';

import { useBreakpointsMatch } from 'services/adaptability';

export type Props = {
  title: React.ReactNode;
  chart: JSX.Element;
  apyValue: JSX.Element;
  button?: JSX.Element;
};

export function PoolSummaryCard(props: Props) {
  const { title, chart, apyValue, button } = props;
  const classes = useStyles();

  const isMobile = useBreakpointsMatch({ to: 'tabletXS' });

  return (
    <Grid container wrap="nowrap" direction="column" spacing={isMobile ? 1 : 3}>
      <Grid item className={classes.label}>
        {title}
      </Grid>
      <Grid container item spacing={isMobile ? 1 : 2} wrap="nowrap">
        <Grid item>{chart}</Grid>
        <Grid container item xs direction="column">
          <Grid item>
            <Metric
              title="APY"
              value={<div className={classes.apyValue}>{apyValue}</div>}
              variant="condensed"
            />
          </Grid>
          {button && <Grid item>{button}</Grid>}
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  theme => ({
    label: {
      fontSize: 12,
      [theme.breakpoints.up('tabletXS')]: {
        fontSize: 16,
      },
    },
    apyValue: {
      fontSize: 22,
      [theme.breakpoints.up('tabletXS')]: {
        fontSize: 32,
      },
    },
  }),
  { name: 'PoolSummaryCard' },
);
