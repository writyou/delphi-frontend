import * as React from 'react';

import { Typography, Box, Table, ComingSoon } from 'components';

import { AllTokenIcons } from './AllTokenIcons';

export function DemoPage() {
  return (
    <Box p={5}>
      <Typography variant="h4" gutterBottom>
        Page for developers
      </Typography>
      <AllTokenIcons />
      <ColSpanTableDemo />
    </Box>
  );
}

type TableData = {
  text: string;
  amount: number;
};

const columns: Array<Table.models.Column<TableData>> = [
  {
    renderTitle: () => 'Asset',
    cellContent: {
      kind: 'simple',
      render: x => x.text,
      colSpan: x => (x && x.text === 'Skip' ? 'end' : 1),
    },
  },

  {
    renderTitle: () => 'Amount',
    cellContent: {
      kind: 'simple',
      render: x =>
        x.amount === 0 ? <ComingSoon variant="label" text="Coming Soon in September" /> : x.amount,
      colSpan: x => (x && x.amount === 0 ? 2 : 1),
    },
    align: 'right',
  },

  {
    renderTitle: () => 'Next',
    cellContent: {
      kind: 'simple',
      render: () => <>Test1</>,
    },
    align: 'right',
  },
  {
    renderTitle: () => 'Next',
    cellContent: {
      kind: 'simple',
      render: () => <>Test2</>,
    },
    align: 'right',
  },
  {
    renderTitle: () => 'Next',
    cellContent: {
      kind: 'simple',
      render: () => <>Test3</>,
    },
    align: 'right',
  },
];

const tableData: TableData[] = [
  {
    text: 'Skip',
    amount: 10,
  },
  {
    text: 'Test',
    amount: 0,
  },
  {
    text: 'Test',
    amount: 20,
  },
  {
    text: 'Skip',
    amount: 0,
  },
  {
    text: 'Test',
    amount: 10,
  },
];

function ColSpanTableDemo() {
  return <Table.Component rowPadding="small" columns={columns} entries={tableData} />;
}
