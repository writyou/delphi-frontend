import React from 'react';
import { LiquidityAmount, TokenAmount, Token } from '@akropolis-web/primitives';

import {
  Table,
  FormattedAmount,
  CompositionChart,
  SimpleLegend,
  PieChartData,
  CompositionLegend,
  Grid,
  TokenName,
} from 'components';

import { InnerLegendAPY } from '../../../MyPools/Components/InnerLegendAPY';

export type Order = {
  asset: string;
  amount: number;
  NAV: LiquidityAmount;
  token: Token;
};

export const columnsWithoutExpandableRows: Array<Table.models.Column<Order>> = [
  {
    renderTitle: () => 'Asset',
    cellContent: {
      kind: 'simple',
      render: x => <TokenName token={x.token} />,
    },
  },

  {
    renderTitle: () => 'Amount',
    cellContent: {
      kind: 'simple',
      render: x => x.amount,
    },
  },

  {
    renderTitle: () => 'NAV',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.NAV} />,
    },
  },
];

export const columnForChart: Array<Table.models.Column<
  PieChartData<LiquidityAmount, TokenAmount>[]
>> = [
  {
    renderTitle: () => 'Composition',
    cellContent: {
      kind: 'simple',
      render: x => (
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <CompositionChart
              withBackground
              chartData={x}
              InnerLegend={InnerLegendAPY}
              size="extra-large"
            />
          </Grid>
          <Grid item>
            <CompositionLegend<LiquidityAmount, TokenAmount>
              chartData={x}
              Template={props => (
                <SimpleLegend
                  {...props}
                  renderLabel={({ pieData }) => pieData.payload.currency.symbol}
                />
              )}
            />
          </Grid>
        </Grid>
      ),
    },
  },
];
