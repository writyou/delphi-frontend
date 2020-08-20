import React from 'react';

import {
  Grid,
  FormattedAmount,
  Divider,
  PoolSummaryCard,
  Label,
  Button,
  CatsPawPlaceholder,
} from 'components';
import { percentAmount } from 'utils/mock';

import { UserSavingsPoolsSummary } from './UserSavingsPoolsSummary';
import { UserStakingPoolsSummary } from './UserStakingPoolsSummary';
import { UserInvestmentPoolsSummary } from './UserInvestmentPoolsSummary';
import { UserDCAPoolsSummary } from './UserDCAPoolsSummary';

export function APYMetricsSection() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <UserSavingsPoolsSummary />
      </Grid>
      <Grid item xs={6}>
        <UserInvestmentPoolsSummary />
      </Grid>
      <Grid item xs={6}>
        <UserDCAPoolsSummary />
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
            chart={<CatsPawPlaceholder size="extra-small" />}
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
