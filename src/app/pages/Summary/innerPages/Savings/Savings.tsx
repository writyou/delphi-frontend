import * as React from 'react';
import { map } from 'rxjs/operators';

import { makeStyles } from 'utils/styles';
import { NewTable, Loading, Typography, Hint, Grid } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { UserSavingsPoolsTotalBalance } from 'features/savingsPools';

import * as tableData from './tableData';

export function Savings() {
  const classes = useStyles();

  const api = useApi();
  const [pools, poolsMeta] = useSubscribable(() => api.user.getMySavingsPools$(), [api]);

  const [entriesForChart, entriesForChartMeta] = useSubscribable(
    () =>
      api.user
        .getAllSavingsPoolsBalances$()
        .pipe(
          map(balances => [
            balances.map(({ balance, pool }) => ({ value: balance, payload: pool })),
          ]),
        ),
    [api],
  );

  return (
    <div className={classes.root}>
      <Loading meta={[poolsMeta, entriesForChartMeta]}>
        {!pools?.length || !entriesForChart ? (
          <Hint>
            <Typography>Not found</Typography>
          </Hint>
        ) : (
          <Grid container className={classes.table}>
            <Grid item xs={7}>
              <NewTable.Component
                columns={tableData.columnsWithSubtable}
                entries={pools}
                summary={{
                  renderLabel: () => 'Total Allocated:',
                  renderValue: () => <UserSavingsPoolsTotalBalance />,
                }}
              />
            </Grid>
            <Grid item xs>
              <NewTable.Component columns={tableData.columnForChart} entries={entriesForChart} />
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
