import * as React from 'react';

import { Grid, Label, Metric, Box } from 'components';
import { UsersCount, TotalPoolsBalance } from 'features/globalStats';
import { Cat1 } from 'components/icons';

export function LiveStats() {
  return (
    <Grid container spacing={3} justify="space-between">
      <Grid item>
        <Label>Live Stats</Label>
      </Grid>
      <Grid item>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item>
            <Box fontSize={66}>
              <Cat1 fontSize="inherit" />
            </Box>
          </Grid>
          <Grid item>
            <Metric title="Active Members" value={<UsersCount />} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Metric title="Total Value Locked" value={<TotalPoolsBalance />} />
      </Grid>
    </Grid>
  );
}