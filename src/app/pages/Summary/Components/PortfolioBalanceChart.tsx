import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { Label, Grid } from 'components';
import { ChartWithCat } from 'components/icons';
import { PeriodSwitch } from 'components/Chart/components/PeriodSwitch/PeriodSwitch';

type Props = {
  isUserLoggedIn: boolean;
};

function PortfolioBalanceChart(props: Props) {
  const classes = useStyles();
  const { isUserLoggedIn } = props;

  return (
    <Grid container spacing={4} direction="column" className={classes.root}>
      <Grid item container spacing={2} justify="space-between">
        <Grid item>
          <Label withComingSoon={isUserLoggedIn}>Portfolio balance</Label>
        </Grid>
        <Grid item>
          <PeriodSwitch period="all" onSelect={() => {}} />
        </Grid>
      </Grid>
      <Grid item container spacing={4}>
        <Grid item xs={12}>
          <ChartWithCat className={classes.cat} hideText={isUserLoggedIn} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export const useStyles = makeStyles(
  () => ({
    root: {
      maxWidth: 553,
    },
    cat: {
      width: '100%',
      height: 'unset',
    },
  }),
  { name: 'PortfolioBalanceChart' },
);

export { PortfolioBalanceChart };
