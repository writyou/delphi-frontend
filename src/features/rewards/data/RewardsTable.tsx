import React from 'react';

import { useApi } from 'services/api';
import { Table, FormattedAmount, TokenName, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { RewardData } from 'model/types';

const columnsWithoutExpandableRows: Array<Table.models.Column<RewardData>> = [
  {
    renderTitle: () => 'Asset',
    cellContent: {
      kind: 'simple',
      render: x => <TokenName token={x.amount.currency} />,
    },
  },

  {
    renderTitle: () => 'Amount',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.amount} variant="plain" hideSymbol />,
    },
  },

  {
    renderTitle: () => 'NAV',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.NAV} variant="plain" />,
    },
  },
];

export function RewardsTable() {
  const api = useApi();
  const rewardsRD = useSubscribable(() => api.user.getRewardsData$(), [api]);

  return (
    <Loading data={rewardsRD}>
      {rewards =>
        rewards.length ? (
          <Table.Component
            rowPadding="small"
            columns={columnsWithoutExpandableRows}
            entries={rewards}
          />
        ) : null
      }
    </Loading>
  );
}
