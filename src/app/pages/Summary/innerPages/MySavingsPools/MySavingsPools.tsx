import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { Table, Loading, Typography, Hint, Grid } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { UserSavingsPoolsTotalBalance } from 'features/savingsPools';

import * as tableData from './tableData';

export function MySavingsPools() {
  const classes = useStyles();

  const api = useApi();
  const [pools, poolsMeta] = useSubscribable(() => api.user.getMySavingsPools$(), [api]);

  return (
    <div className={classes.root}>
      <Loading meta={[poolsMeta]}>
        {!pools?.length ? (
          <Hint>
            <Typography>Not found</Typography>
          </Hint>
        ) : (
          <Grid container className={classes.table}>
            <Grid item xs={7}>
              <Table.Component
                columns={tableData.columnsWithSubtable}
                entries={pools}
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
  { name: 'MySavingsPools' },
);
