import React from 'react';

import {
  Grid,
  GradientArrowButton,
  FormattedAmount,
  Divider,
  PoolSummaryCard,
  Label,
  Button,
} from 'components';
import { CatsPaw } from 'components/icons';
import { routes } from 'app/routes';
import { makeStyles } from 'utils/styles';
import { percentAmount } from 'utils/mock';
import { UserSavingsPoolsSummary } from 'features/savingsPools';
import { UserStakingPoolsSummary } from 'features/stakingPools';

export function APYMetricsSection() {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <UserSavingsPoolsSummary />
      </Grid>
      <Grid item xs={6}>
        <PoolSummaryCard
          title={<Label withComingSoon>Investments</Label>}
          chart={<CatsPaw variant="violet" className={classes.icon} />}
          apyValue={<FormattedAmount sum={percentAmount} />}
          button={
            <GradientArrowButton to={routes.investments.getRedirectPath()}>
              Invest
            </GradientArrowButton>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <PoolSummaryCard
          title={<Label withComingSoon>DCA</Label>}
          chart={<CatsPaw variant="turquoise" className={classes.icon} />}
          apyValue={<FormattedAmount sum={percentAmount} />}
          button={<GradientArrowButton to={routes.dca.getRedirectPath()}>DCA</GradientArrowButton>}
        />
      </Grid>
      <Grid item xs={6}>
        <UserStakingPoolsSummary />
      </Grid>
      {/* TODO: Hide below elements if user's harvest is zero */}
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid container item xs={12} justify="space-between">
        <Grid item>
          <PoolSummaryCard
            title={<Label withComingSoon>Harvest</Label>}
            chart={<CatsPaw variant="pink" className={classes.icon} />}
            apyValue={<FormattedAmount sum={percentAmount} />}
          />
        </Grid>
        <Grid item>
          {/* TODO: Replace with ModalButton */}
          <Button variant="contained" color="primary" size="small" disabled>
            Withdraw
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  () => ({
    icon: {
      fontSize: 50,
    },
  }),
  { name: 'APYMetricsSection' },
);
