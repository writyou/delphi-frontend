import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  NewTable,
  FormattedAmount,
  PieChartData,
  SimpleLegend,
  CompositionChart,
  Metric,
  Link,
  Box,
  TokensIcons,
} from 'components';
import { LiquidityAmount } from 'model/entities';
import { SavingsPool } from 'model/types';
import { UserSavingsPoolBalance, UserSavingsPoolsAvgAPY } from 'features/savingsPools';
import { routes } from 'app/routes';

export const columnForChart: Array<NewTable.models.Column<
  PieChartData<LiquidityAmount, SavingsPool>[]
>> = [
  {
    renderTitle: () => (
      <Box ml={10} component="span">
        Composition
      </Box>
    ),
    cellContent: {
      kind: 'simple',
      render: x => (
        <Box ml={10}>
          <CompositionChart
            chartData={x}
            Legend={({ sectors }) => (
              <SimpleLegend
                sectors={sectors}
                renderLabel={({ pieData }) => pieData.payload.devName}
              />
            )}
            InnerLegend={ChartInnerLegend}
            size="extra-large"
          />
        </Box>
      ),
    },
  },
];

function ChartInnerLegend() {
  return <Metric title="APY" value={<UserSavingsPoolsAvgAPY />} />;
}

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
          title={x.devName}
        >
          {x.devName}
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
