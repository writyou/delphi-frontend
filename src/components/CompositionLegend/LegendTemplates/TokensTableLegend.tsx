import * as React from 'react';
import { TokenAmount } from '@akropolis-web/primitives';

import { Table } from '../../Table';
import { FormattedAmount } from '../../FormattedAmount/FormattedAmount';
import { PieSector, CompositionChartLegendProps } from '../../CompositionChart/model';
import { SectorColorLabel } from '../../CompositionChart/SectorColorLabel';
import { TokenTitle } from '../../CompositionChart/TokenTitle';
import { roundPercentAmount } from './roundPercentAmount';

export function TokensTableLegend(props: CompositionChartLegendProps<TokenAmount>) {
  const { sectors } = props;

  return <Table.Component rowPadding="small" columns={columnForLegend} entries={sectors} />;
}

const columnForLegend: Array<Table.models.Column<PieSector<TokenAmount>>> = [
  {
    cellContent: {
      kind: 'simple',
      render: x => (
        <TokenTitle
          title={x.pieData.value.currency.symbol}
          address={x.pieData.value.currency.address}
        />
      ),
    },
  },
  {
    cellContent: {
      kind: 'simple',
      render: x => (
        <SectorColorLabel
          title={<FormattedAmount sum={roundPercentAmount(x.percent)} variant="plain" />}
          color={x.color.rgb}
        />
      ),
    },
    align: 'right',
  },
  {
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.pieData.value} variant="plain" hideSymbol />,
    },
    align: 'right',
  },
];
