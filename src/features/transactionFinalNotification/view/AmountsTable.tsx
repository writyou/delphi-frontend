import React from 'react';
import { TokenAmount } from '@akropolis-web/primitives';
import { TokenName } from '@akropolis-web/components';

import { FormattedAmount, Grid } from 'components';

export function AmountsTable({ amounts }: { amounts: TokenAmount[] }) {
  return (
    <Grid container wrap="nowrap">
      <Grid item container direction="column" spacing={1}>
        {amounts.map(amount => (
          <Grid item>
            <TokenName token={amount.currency} />
          </Grid>
        ))}
      </Grid>
      <Grid item container direction="column" spacing={1}>
        {amounts.map(amount => (
          <Grid item>
            <FormattedAmount sum={amount} variant="plain" hideSymbol />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
