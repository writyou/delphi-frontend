import * as React from 'react';
import { Token } from '@akropolis-web/primitives';

import { makeStyles } from 'utils/styles';
import { TokenIcon } from 'components/TokenIcon/TokenIcon';

type Props = {
  tokens: Token[];
};

export function TokensIcons(props: Props) {
  const classes = useStyles();
  const { tokens } = props;

  return (
    <div className={classes.root}>
      {tokens.map(({ address }) => {
        return (
          <div className={classes.icon} key={address}>
            <TokenIcon tokenAddress={address} />
          </div>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      marginLeft: 7,
    },
    icon: {
      marginLeft: -7,
    },
  }),
  { name: 'TokensIcons' },
);
