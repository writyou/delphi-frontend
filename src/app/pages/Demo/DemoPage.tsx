import * as React from 'react';

import { Typography, Box } from 'components';
import { InfiniteApproveSwitch } from 'features/infiniteApprove';
import { Token } from 'model/entities';
import { zeroAddress } from 'utils/mock';

import { SavingsPollsList } from './components/SavingsPollsList';

const tokens = [
  new Token(zeroAddress, 'DAI', 18),
  new Token(zeroAddress, 'DAI', 18),
  new Token(zeroAddress, 'DAI', 18),
  new Token(zeroAddress, 'DAI', 18),
  new Token(zeroAddress, 'DAI', 18),
];

export function DemoPage() {
  return (
    <Box p={5}>
      <Typography variant="h4" gutterBottom>
        Page for developers
      </Typography>
      <SavingsPollsList />
      <InfiniteApproveSwitch tokens={tokens} spender="765HJSGFIUAS7865IHGHIS76" />
    </Box>
  );
}
