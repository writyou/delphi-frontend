import React from 'react';

import { useApi } from 'services/api';
import { Table, FormattedAmount, TokenName, Loading, ComingSoon } from 'components';
import { useSubscribable } from 'utils/react';
import { RewardData } from 'model/types';
import { ETH_NETWORK_CONFIG } from 'env';

function withComingSoonLabel(tokenAddress: string) {
  const comingSoonTokenAddresses = [ETH_NETWORK_CONFIG.tokens.AKRO, ETH_NETWORK_CONFIG.tokens.ADEL];

  return comingSoonTokenAddresses.some(t => t.toLowerCase() === tokenAddress.toLowerCase());
}

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
      render: x =>
        withComingSoonLabel(x.amount.currency.address) ? (
          <ComingSoon variant="label" text="Coming Soon in September" />
        ) : (
          <FormattedAmount sum={x.amount} variant="plain" hideSymbol />
        ),
      colSpan: x => (withComingSoonLabel(x.amount.currency.address) ? 'end' : 1),
    },
    align: 'right',
  },

  {
    renderTitle: () => 'NAV',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.NAV} variant="plain" />,
    },
    align: 'right',
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
