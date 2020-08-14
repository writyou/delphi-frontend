import React from 'react';
import { TokenAmount } from '@akropolis-web/primitives';

import { Table, FormattedAmount, Box, TokenIcon } from 'components';
import { StakingPool } from 'model/types';
import { UserStakingPoolsBalancesComposition } from 'features/stakingPools';

export type StakingPoolEntry = StakingPool & {
  balance: TokenAmount;
  availableForUnstake: TokenAmount;
};

export const columnForChart: Array<Table.models.Column<{}>> = [
  {
    renderTitle: () => (
      <Box ml={10} component="span">
        Composition
      </Box>
    ),
    cellContent: {
      kind: 'simple',
      render: () => (
        <Box ml={10}>
          <UserStakingPoolsBalancesComposition
            withCompositionLegend
            withInnerLegend
            size="extra-large"
          />
        </Box>
      ),
    },
  },
];

export const columnsWithSubtable: Array<Table.models.Column<StakingPoolEntry, number>> = [
  {
    renderTitle: () => '',
    cellContent: {
      kind: 'simple',
      render: x => <TokenIcon tokenAddress={x.token.address} />,
    },
  },

  {
    renderTitle: () => 'Pool',
    cellContent: {
      kind: 'simple',
      render: x => x.poolName,
    },
  },

  {
    renderTitle: () => 'Full Stake',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.balance} variant="plain" />,
    },
  },

  {
    renderTitle: () => 'Available for Unstake',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.availableForUnstake} variant="plain" />,
    },
  },
];
