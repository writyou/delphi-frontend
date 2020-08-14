import * as React from 'react';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { makeStyles } from 'utils/styles';
import { Table, Loading, Typography, Hint, Grid } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { UserStakingPoolsTotalBalance } from 'features/stakingPools';

import * as tableData from './tableData';

export function Staking() {
  const classes = useStyles();

  const api = useApi();
  const [stakingPools, stakingPoolsMeta] = useSubscribable(
    () =>
      api.user.getMyStakingPools$().pipe(
        switchMap(pools =>
          combineLatest(
            pools.map(pool =>
              combineLatest([
                api.user.getFullStakingPoolBalance$(pool.address),
                api.user.getUnlockedStakingPoolBalance$(pool.address),
              ]).pipe(
                map(([fullBalance, unlockedBalance]) => ({
                  ...pool,
                  balance: fullBalance,
                  availableForUnstake: unlockedBalance,
                })),
              ),
            ),
          ),
        ),
      ),
    [api],
  );

  return (
    <div className={classes.root}>
      <Loading meta={stakingPoolsMeta}>
        {!stakingPools?.length ? (
          <Hint>
            <Typography>Not found</Typography>
          </Hint>
        ) : (
          <Grid container className={classes.table}>
            <Grid item xs={7}>
              <Table.Component
                columns={tableData.columnsWithSubtable}
                entries={stakingPools}
                summary={{
                  renderLabel: () => 'Total Staked:',
                  renderValue: () => <UserStakingPoolsTotalBalance />,
                }}
              />
            </Grid>
            <Grid item xs>
              <Table.Component columns={tableData.columnForChart} entries={[{}]} />
            </Grid>
          </Grid>
        )}
      </Loading>
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {},
    table: {
      position: 'relative',
    },
  }),
  { name: 'Staking' },
);
