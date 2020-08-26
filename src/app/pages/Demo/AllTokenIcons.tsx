import * as React from 'react';

import { Box, Grid } from 'components';
import * as tokens from 'components/icons/tokens';

export function AllTokenIcons() {
  return (
    <Box mt={2} maxWidth={200} fontSize={30}>
      <Grid container spacing={1}>
        {Object.values(tokens).map((Token, i) => (
          <Grid item key={i}>
            <Token fontSize="inherit" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
