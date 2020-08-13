import * as React from 'react';
import { map } from 'rxjs/operators';
import { empty, combineLatest } from 'rxjs';

import { makeStyles } from 'utils/styles';
import { Table, Loading, Typography, Hint, Grid } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { UserSavingsPoolsTotalBalance } from 'features/savingsPools';

import * as tableData from './tableData';

export function Savings() {
  const classes = useStyles();

  const api = useApi();
  const [stakingPools] = useSubscribable(() => api.user.getMyStakingPools$(), [api]);

  const [tablePools, tablePoolsMeta] = useSubscribable(
    () =>
      stakingPools
        ? combineLatest(
            stakingPools.map(pool =>
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
          )
        : empty(),
    [api, stakingPools],
  );

  return (
    <div className={classes.root}>
      <Loading meta={[tablePoolsMeta]}>
        {!tablePools?.length ? (
          <Hint>
            <Typography>Not found</Typography>
          </Hint>
        ) : (
          <Grid container className={classes.table}>
            <Grid item xs={7}>
              <Table.Component
                columns={tableData.columnsWithSubtable}
                entries={tablePools}
                summary={{
                  renderLabel: () => 'Total Allocated:',
                  renderValue: () => <UserSavingsPoolsTotalBalance />,
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
  { name: 'Savings' },
);
