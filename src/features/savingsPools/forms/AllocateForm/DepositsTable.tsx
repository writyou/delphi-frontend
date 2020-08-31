import React from 'react';

import { DepositToSavingsPool } from 'model/types';
import { Table, FormattedAmount, TokenName } from 'components';

import { SavingsPoolName } from '../../data/SavingsPoolName';

export function DepositsTable({ deposits }: { deposits: DepositToSavingsPool[] }) {
  return <Table.Component entries={deposits} columns={columns} />;
}

const columns: Table.models.Column<DepositToSavingsPool>[] = [
  {
    renderTitle: () => 'Pool',
    cellContent: {
      kind: 'simple',
      render: fee => <SavingsPoolName poolAddress={fee.poolAddress} />,
    },
  },
  {
    renderTitle: () => 'Asset',
    cellContent: {
      kind: 'simple',
      render: fee => <TokenName token={fee.amount.currency} />,
    },
  },
  {
    renderTitle: () => 'Amount',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: fee => <FormattedAmount sum={fee.amount} hideSymbol variant="plain" />,
    },
  },
];
