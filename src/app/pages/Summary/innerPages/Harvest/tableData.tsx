import React from 'react';

import {
  NewTable,
  FormattedAmount,
  CompositionChart,
  SimpleLegend,
  PieChartData,
  CompositionLegend,
  Grid,
} from 'components';
import { LiquidityAmount, PercentAmount, TokenAmount } from 'model/entities';

import { InnerLegendAPY } from '../../Components/InnerLegendAPY';

export type Order = {
  asset: string;
  amount: number;
  APY: PercentAmount;
  NAV: LiquidityAmount;
};

export const columnsWithoutExpandableRows: Array<NewTable.models.Column<Order>> = [
  {
    renderTitle: () => 'Asset',
    cellContent: {
      kind: 'simple',
      render: x => x.asset,
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
    renderTitle: () => 'APY',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.APY} />,
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

export const columnForChart: Array<NewTable.models.Column<
  PieChartData<LiquidityAmount, TokenAmount>[]
>> = [
  {
    renderTitle: () => 'Composition',
    cellContent: {
      kind: 'simple',
      render: x => (
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <CompositionChart chartData={x} InnerLegend={InnerLegendAPY} size="extra-large" />
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
