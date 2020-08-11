import React from 'react';
import cn from 'classnames';
import { jsNumberForAddress } from 'react-jazzicon';

import { USDCIcon, USDTIcon, TUSDIcon, DAIIcon } from 'components/icons';
import { ETH_NETWORK_CONFIG } from 'env';
import { makeStyles } from 'utils/styles';

import { JazzIcon } from '../JazzIcon/JazzIcon';

type Props = {
  tokenAddress: string;
  className?: string;
};
type CoinComponent = typeof DAIIcon;

export const tokenIcons: Record<string, CoinComponent> = {
  [ETH_NETWORK_CONFIG.tokens.DAI.toLowerCase()]: DAIIcon,
  [ETH_NETWORK_CONFIG.tokens.USDC.toLowerCase()]: USDCIcon,
  [ETH_NETWORK_CONFIG.tokens.USDT.toLowerCase()]: USDTIcon,
  [ETH_NETWORK_CONFIG.tokens.TUSD.toLowerCase()]: TUSDIcon,
};

export function TokenIcon({ tokenAddress, className }: Props) {
  const classes = useStyles();
  const Icon = tokenIcons[tokenAddress.toLowerCase()];
  const hasIcon = Icon !== undefined;

  return hasIcon ? (
    <>
      <Icon className={className} />
    </>
  ) : (
    <div className={cn(classes.jazzIcon, className)}>
      <JazzIcon seed={jsNumberForAddress(tokenAddress)} />
    </div>
  );
}

const useStyles = makeStyles(
  {
    jazzIcon: {
      display: 'inline-flex',
    },
  },
  { name: 'TokenIcon' },
);
