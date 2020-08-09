import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Token } from 'model/entities';
import { TokenIcon } from 'components/TokenIcon/TokenIcon';
import { makeStyles } from 'utils/styles';

type TokenNameProps = {
  token: Token;
};

export function TokenName({ token }: TokenNameProps) {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <TokenIcon tokenAddress={token.address} className={classes.icon} />
      {token.symbol}
    </Grid>
  );
}

const useStyles = makeStyles({
  icon: {
    marginRight: 8,
  },
});
