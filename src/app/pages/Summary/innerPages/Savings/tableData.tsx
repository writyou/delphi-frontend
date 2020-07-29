import React from 'react';

import { NewTable, FormattedAmount, PieCurrency, CompositionChart } from 'components';
import { TokenAmount, PercentAmount, Amount, Currency, Token } from 'model/entities';

import { IconsBlock } from '../../Components/IconsBlock';
import { PoolTitle } from '../../Components/PoolTitle';

export type Order = {
  pool: string;
  tokens: string[];
  APY: PercentAmount;
  balance: TokenAmount;
  additionalTable: number[];
  poolFullTitle?: string;
};

export const columnForChart: Array<NewTable.models.Column<
  PieCurrency<Amount<Currency | Token>>[]
>> = [
  {
    renderTitle: () => 'Composition',
    cellContent: {
      kind: 'simple',
      render: x => <CompositionChart chartData={x} legendType="simple" />,
    },
  },
];

export const columnsWithSubtable: Array<NewTable.models.Column<Order, number>> = [
  {
    renderTitle: () => '',
    cellContent: {
      kind: 'simple',
      render: x => <IconsBlock icons={x.tokens} />,
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
