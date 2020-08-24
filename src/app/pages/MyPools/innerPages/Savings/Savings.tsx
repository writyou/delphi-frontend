import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { Table, DeprecatedLoading, Grid } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';
import { UserSavingsPoolsTotalBalance } from 'features/savingsPools';

import * as tableData from './tableData';
import { EmptyListHint } from '../../Components/EmptyListHint';

export function Savings() {
  const classes = useStyles();

  const api = useApi();
  const [pools, poolsMeta] = useSubscribableDeprecated(() => api.user.getMySavingsPools$(), [api]);

  return (
    <div className={classes.root}>
      <DeprecatedLoading meta={[poolsMeta]}>
        {!pools?.length ? (
          <EmptyListHint redirectPage="savings" />
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
      </DeprecatedLoading>
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
