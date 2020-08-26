import * as React from 'react';

import { Typography, Box } from 'components';

import { AllTokenIcons } from './AllTokenIcons';

export function DemoPage() {
  return (
    <Box p={5}>
      <Typography variant="h4" gutterBottom>
        Page for developers
      </Typography>
      <AllTokenIcons />
    </Box>
  );
}
