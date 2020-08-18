import * as React from 'react';

import { Grid, Label, Metric, Box } from 'components';
import { UsersCount, TotalPoolsBalance } from 'features/globalStats';
import { Cat1 } from 'components/icons';

export function LiveStats() {
  return (
    <Grid container spacing={3} justify="space-between">
      <Grid item xs={3}>
        <Label>Live Stats</Label>
      </Grid>
      <Grid item xs>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item>
            <Box fontSize={60}>
              <Cat1 fontSize="inherit" />
            </Box>
          </Grid>
          <Grid item>
            <Metric title="Active Members" titleSize="small" value={<UsersCount />} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <Metric title="Total Value Locked" titleSize="small" value={<TotalPoolsBalance />} />
      </Grid>
    </Grid>
  );
}
