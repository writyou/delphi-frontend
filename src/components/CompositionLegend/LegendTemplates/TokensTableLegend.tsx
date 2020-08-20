import * as React from 'react';
import { Amount, TokenAmount } from '@akropolis-web/primitives';

import { Table } from '../../Table';
import { FormattedAmount } from '../../FormattedAmount/FormattedAmount';
import { PieSector, CompositionChartLegendProps } from '../../CompositionChart/model';
import { SectorColorLabel } from '../../CompositionChart/SectorColorLabel';
import { TokenTitle } from '../../CompositionChart/TokenTitle';
import { roundPercentAmount } from './roundPercentAmount';

type Props<T extends Amount, P = void> = {
  getTokenAmount: (sector: PieSector<T, P>) => TokenAmount;
} & CompositionChartLegendProps<T, P>;

export function TokensTableLegend<T extends Amount, P = void>(props: Props<T, P>) {
  const { sectors, getTokenAmount } = props;

  const columns = React.useMemo(() => mkColumns(getTokenAmount), [getTokenAmount]);

  return <Table.Component rowPadding="small" columns={columns} entries={sectors} />;
}

const mkColumns = <T extends Amount, P = void>(
  getTokenAmount: Props<T, P>['getTokenAmount'],
): Array<Table.models.Column<PieSector<T, P>>> => [
  {
    cellContent: {
      kind: 'simple',
      render: x => {
        const amount = getTokenAmount(x);
        return <TokenTitle title={amount.currency.symbol} address={amount.currency.address} />;
      },
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
      render: x => <FormattedAmount sum={getTokenAmount(x)} variant="plain" hideSymbol />,
    },
    align: 'right',
  },
];
