import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { TokenAmount } from 'model/entities';

import { Component as NewTable, models as NewTableModels } from '../../NewTable';
import { FormattedAmount } from '../../FormattedAmount/FormattedAmount';
import { PieSector, CompositionChartLegendProps } from '../../CompositionChart/model';
import { SectorColorLabel } from '../../CompositionChart/SectorColorLabel';
import { TokenTitle } from '../../CompositionChart/TokenTitle';

export function TokensTableLegend(props: CompositionChartLegendProps<TokenAmount>) {
  const { sectors } = props;
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <NewTable columns={columnForLegend} entries={sectors} />
    </div>
  );
}

const columnForLegend: Array<NewTableModels.Column<PieSector<TokenAmount>>> = [
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

export const useStyles = makeStyles(
  {
    table: {
      marginLeft: 25,
      marginTop: 15,
    },
  },
  { name: 'TokensTableLegend' },
);
