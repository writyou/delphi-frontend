import React from 'react';

import {
  NewTable,
  FormattedAmount,
  CompositionChart,
  SimpleLegend,
  PieChartData,
  CompositionLegend,
  Grid,
  TokensIcons,
} from 'components';
import { TokenAmount, PercentAmount, LiquidityAmount } from 'model/entities';
import { SavingsPool } from 'model/types';
import { mockedTokens } from 'utils/mock';

import { PoolTitle } from '../../Components/PoolTitle';
import { InnerLegendAPY } from '../../Components/InnerLegendAPY';

export type Order = {
  pool: string;
  tokens: string[];
  APY: PercentAmount;
  balance: TokenAmount;
  additionalTable: number[];
  poolFullTitle?: string;
};

export const columnForChart: Array<NewTable.models.Column<
  PieChartData<LiquidityAmount, SavingsPool>[]
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
            <CompositionLegend<LiquidityAmount, SavingsPool>
              chartData={x}
              Template={props => (
                <SimpleLegend {...props} renderLabel={({ pieData }) => pieData.payload.devName} />
              )}
            />
          </Grid>
        </Grid>
      ),
    },
  },
];

export const columnsWithSubtable: Array<NewTable.models.Column<Order, number>> = [
  {
    renderTitle: () => '',
    cellContent: {
      kind: 'simple',
      render: () => <TokensIcons tokens={mockedTokens} />,
    },
  },

  {
    renderTitle: () => 'Pools',
    cellContent: {
      kind: 'simple',
      render: x => <PoolTitle title={x.pool} fullTitle={x.poolFullTitle} />,
    },
  },

  {
    renderTitle: () => 'APY',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.APY} variant="plain" />,
    },
  },

  {
    renderTitle: () => 'Balance',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.balance} variant="plain" />,
    },
  },

  {
    renderTitle: () => null,
    cellContent: {
      kind: 'for-row-expander',
      expandedArea: {
        kind: 'subtable',
        getSubtableEntries: x => x.additionalTable,
        subtableColumns: [
          {
            renderTitle: () => 'Test',
            renderCell: x => x,
          },
        ],
      },
    },
  },
];
