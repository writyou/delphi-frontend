import React from 'react';

import { getSignificantValue } from 'utils';
import { DepositToSavingsPoolWithFee } from 'model/types';
import { Table, FormattedAmount, TokenName } from 'components';

import { InvestmentsPoolName } from '../../data/InvestmentsPoolName';

export function FeesTable({ fees }: { fees: DepositToSavingsPoolWithFee[] }) {
  return <Table.Component entries={fees} columns={columns} />;
}

const columns: Table.models.Column<DepositToSavingsPoolWithFee>[] = [
  {
    renderTitle: () => 'Pool',
    cellContent: {
      kind: 'simple',
      render: fee => <InvestmentsPoolName poolAddress={fee.poolAddress} />,
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
