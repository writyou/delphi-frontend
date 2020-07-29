import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { Amount, Currency, Token } from 'model/entities';

import { Component as NewTable, models as NewTableModels } from '../../NewTable';
import { FormattedAmount } from '../../FormattedAmount/FormattedAmount';
import { PieSector } from '../model';
import { SectorColorLabel } from '../SectorColorLabel';
import { PoolTitle } from '../PoolTitle';

export function TokensTableLegend<T extends Amount<Currency | Token>>(chartData: PieSector<T>[]) {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <NewTable columns={columnForLegend} entries={chartData} />
    </div>
  );
}

const columnForLegend: Array<NewTableModels.Column<PieSector<Amount<Currency | Token>>>> = [
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
          color={x.color.label}
        />
      ),
    },
  },
  {
    cellContent: {
      kind: 'simple',
      render: x => x.value.toBN().toString(),
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
