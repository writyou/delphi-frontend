import * as React from 'react';

import { TokenAmount } from 'model/entities';

import { NewTable } from '../../NewTable';
import { FormattedAmount } from '../../FormattedAmount/FormattedAmount';
import { PieSector, CompositionChartLegendProps } from '../../CompositionChart/model';
import { SectorColorLabel } from '../../CompositionChart/SectorColorLabel';
import { TokenTitle } from '../../CompositionChart/TokenTitle';

export function TokensTableLegend(props: CompositionChartLegendProps<TokenAmount>) {
  const { sectors } = props;

  return <NewTable.Component rowPadding="small" columns={columnForLegend} entries={sectors} />;
}

const columnForLegend: Array<NewTable.models.Column<PieSector<TokenAmount>>> = [
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
          title={<FormattedAmount sum={x.percent} variant="plain" />}
          color={x.color.rgb}
        />
      ),
    },
  },
  {
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.pieData.value} variant="plain" hideSymbol />,
    },
  },
];
