import React from 'react';

import { NewTable, FormattedAmount } from 'components';
import { LiquidityAmount, PercentAmount } from 'model/entities';

import { PieChart, PieSector } from '../../Components/PieChart';

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

export const columnForChart: Array<NewTable.models.Column<PieSector[]>> = [
  {
    renderTitle: () => 'Composition',
    cellContent: {
      kind: 'simple',
      render: x => <PieChart sectors={x} />,
    },
  },
];
