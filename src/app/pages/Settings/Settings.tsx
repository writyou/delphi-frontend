import React from 'react';
import { Token } from '@akropolis-web/primitives';

import { makeStyles } from 'utils/styles';
import { Card } from 'components';
import { TokensInfiniteApproveForm } from 'features/infiniteApprove';
import { ETH_NETWORK_CONFIG } from 'env';

export function Settings() {
  const classes = useStyles();

  return (
    <Card variant="contained" className={classes.root}>
      <TokensInfiniteApproveForm
        tokens={Object.keys(ETH_NETWORK_CONFIG.tokens).map(
          (tokenSymbol, i) =>
            new Token(Object.values(ETH_NETWORK_CONFIG.tokens)[i], tokenSymbol, 18),
        )}
      />
    </Card>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      padding: 50,
      minHeight: '100%',
    },
  }),
  { name: 'Settings' },
);
