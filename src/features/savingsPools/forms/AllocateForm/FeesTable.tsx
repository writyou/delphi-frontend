import React from 'react';

import { getSignificantValue } from 'utils';
import { DepositToSavingsPoolWithFee } from 'model/types';
import { Table, FormattedAmount, TokenName } from 'components';

import { SavingsPoolName } from '../../data/SavingsPoolName';

export function FeesTable({ fees }: { fees: DepositToSavingsPoolWithFee[] }) {
  return <Table.Component entries={fees} columns={columns} />;
}

const columns: Table.models.Column<DepositToSavingsPoolWithFee>[] = [
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
  {
    renderTitle: () => 'Fee',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: ({ fee }) => {
        return fee.gt(getSignificantValue(fee.currency.decimals)) ? (
          <FormattedAmount sum={fee} hideSymbol variant="plain" />
        ) : (
          '—'
        );
      },
    },
  },
];
