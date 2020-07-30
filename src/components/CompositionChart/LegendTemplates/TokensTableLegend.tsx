import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { TokenAmount } from 'model/entities';
import { SavingsPool } from 'model/types';

import { Component as NewTable, models as NewTableModels } from '../../NewTable';
import { FormattedAmount } from '../../FormattedAmount/FormattedAmount';
import { PieSector, CompositionChartLegendProps } from '../model';
import { SectorColorLabel } from '../SectorColorLabel';
import { PoolTitle } from '../PoolTitle';

export function TokensTableLegend(props: CompositionChartLegendProps<TokenAmount, SavingsPool>) {
  const { sectors } = props;
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <NewTable columns={columnForLegend} entries={sectors} />
    </div>
  );
}

const columnForLegend: Array<NewTableModels.Column<PieSector<TokenAmount, SavingsPool>>> = [
  {
    cellContent: {
      kind: 'simple',
      render: x => <PoolTitle title={x.pieData.payload.devName} />,
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
      render: x => <FormattedAmount sum={x.pieData.value} variant="plain" />,
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
