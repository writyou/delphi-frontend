import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Table, FormattedAmount, Link, Box, TokenIcon } from 'components';
import { StakingPool } from 'model/types';
import { UserSavingsPoolsBalancesComposition } from 'features/savingsPools';
import { routes } from 'app/routes';
import { TokenAmount } from 'model/entities';

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
          <UserSavingsPoolsBalancesComposition
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
      render: x => (
        <Link
          component={RouterLink}
          to={routes.savings.pool.id.getRedirectPath({ id: x.address })}
          color="textPrimary"
          title={x.poolName}
        >
          {x.poolName}
        </Link>
      ),
    },
  },

  {
    renderTitle: () => 'Full Balance',
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
