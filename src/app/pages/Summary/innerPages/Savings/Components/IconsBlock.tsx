import * as React from 'react';

import { makeStyles } from 'utils/styles';

import { PoolIcon } from './PoolIcon';

export type CurrencyIcon = 'DAI' | 'USDC' | 'USDT' | 'sUSD';

type Props = {
  icons: CurrencyIcon[];
};

export function IconsBlock(props: Props) {
  const classes = useStyles();
  const { icons } = props;

  return (
    <div className={classes.root}>
      {icons.map(icon => {
        return (
          <div className={classes.icon} key={icon}>
            <PoolIcon />
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
    },
    icon: {
      marginLeft: 3,
    },
  }),
  { name: 'IconsBlock' },
);
