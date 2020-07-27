import React from 'react';

import { NewTable, FormattedAmount } from 'components';
import { TokenAmount, PercentAmount } from 'model/entities';

import { PoolTitle } from './PoolTitle';
import { SectorColorLabel } from './SectorColorLabel';

export type Order = {
  value: TokenAmount;
  label: string;
  labelColor: string;
  percent: PercentAmount;
};

export const columnForLegend: Array<NewTable.models.Column<Order>> = [
  {
    cellContent: {
      kind: 'simple',
      render: x => <PoolTitle title={x.label} />,
    },
  },
  {
    cellContent: {
      kind: 'simple',
      render: x => (
        <SectorColorLabel
          title={<FormattedAmount sum={x.percent} variant="plain" />}
          color={x.labelColor}
        />
      ),
    },
  },
  {
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.value} variant="plain" />,
    },
  },
];
