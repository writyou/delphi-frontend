import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { NewTable, FormattedAmount, Link, Box, TokensIcons } from 'components';
import { SavingsPool } from 'model/types';
import { UserSavingsPoolBalance, UserSavingsPoolsBalancesComposition } from 'features/savingsPools';
import { routes } from 'app/routes';

export const columnForChart: Array<NewTable.models.Column<{}>> = [
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

export const columnsWithSubtable: Array<NewTable.models.Column<SavingsPool, number>> = [
  {
    renderTitle: () => '',
    cellContent: {
      kind: 'simple',
      render: x => <TokensIcons tokens={x.tokens} />,
    },
  },

  {
    renderTitle: () => 'Pools',
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
    renderTitle: () => 'APY',
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.apy} variant="plain" />,
    },
  },

  {
    renderTitle: () => 'Balance',
    align: 'right',
    cellContent: {
      kind: 'simple',
      render: x => <UserSavingsPoolBalance poolAddress={x.address} />,
    },
  },

  // {
  //   renderTitle: () => null,
  //   cellContent: {
  //     kind: 'for-row-expander',
  //     expandedArea: {
  //       kind: 'subtable',
  //       getSubtableEntries: x => x.additionalTable,
  //       subtableColumns: [
  //         {
  //           renderTitle: () => 'Test',
  //           renderCell: x => x,
  //         },
  //       ],
  //     },
  //   },
  // },
];
