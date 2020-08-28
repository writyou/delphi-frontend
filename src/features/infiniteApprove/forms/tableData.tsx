import React from 'react';
import { Token } from '@akropolis-web/primitives';

import { Table, TokenIcon, Grid } from 'components';

export type Order = {
  token: Token;
  switch: React.ReactNode;
};

export const columns: Array<Table.models.Column<Order, number>> = [
  {
    renderTitle: () => 'Asset',
    cellContent: {
      kind: 'simple',
      render: x => (
        <Grid container spacing={2}>
          <Grid item>
            <TokenIcon tokenAddress={x.token.address} />
          </Grid>
          <Grid item>{x.token.symbol}</Grid>
        </Grid>
      ),
    },
  },

  {
    renderTitle: () => 'Infinite Unlock',
    cellContent: {
      kind: 'simple',
      render: x => x.switch,
    },
  },
];
