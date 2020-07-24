import React from 'react';

import { NewTable, FormattedAmount } from 'components';
import { TokenAmount, PercentAmount } from 'model/entities';

import { IconsBlock } from '../../Components/IconsBlock';
import { PieChart, PieSector } from '../../Components/PieChart';
import { PoolTitle } from '../../Components/PoolTitle';

export type Order = {
  pool: string;
  tokens: string[];
  APY: PercentAmount;
  balance: TokenAmount;
  additionalTable: number[];
  poolFullTitle?: string;
};

export const columnForChart: Array<NewTable.models.Column<PieSector[]>> = [
  {
    renderTitle: () => 'Composition',
    cellContent: {
      kind: 'simple',
      render: x => <PieChart sectors={x} />,
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
