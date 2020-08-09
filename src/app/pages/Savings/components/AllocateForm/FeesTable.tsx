import React from 'react';

import { DepositToSavingsPoolWithFee } from 'model/types';
import { NewTable, FormattedAmount, TokenName } from 'components';
import { SavingsPoolName } from 'features/savingsPools';

export function FeesTable({ fees }: { fees: DepositToSavingsPoolWithFee[] }) {
  return <NewTable.Component entries={fees} columns={columns} />;
}

const columns: NewTable.models.Column<DepositToSavingsPoolWithFee>[] = [
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
      render: fee => <FormattedAmount sum={fee.amount} hideSymbol />,
    },
  },
  {
    renderTitle: () => 'Fee',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: fee => (fee.fee.isZero() ? '—' : <FormattedAmount sum={fee.fee} hideSymbol />),
    },
  },
];
