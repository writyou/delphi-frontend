import React from 'react';
import JazzIcon, { jsNumberForAddress } from 'react-jazzicon';

import { USDCIcon, USDTIcon, TUSDIcon, DAIIcon } from 'components/icons';
import { ETH_NETWORK_CONFIG } from 'env';

type Props = {
  tokenAddress: string;
  className?: string;
  diameter?: number;
};
type CoinComponent = typeof DAIIcon;

export const tokenIcons: Record<string, CoinComponent> = {
  [ETH_NETWORK_CONFIG.tokens.dai.toLowerCase()]: DAIIcon,
  [ETH_NETWORK_CONFIG.tokens.usdc.toLowerCase()]: USDCIcon,
  [ETH_NETWORK_CONFIG.tokens.usdt.toLowerCase()]: USDTIcon,
  [ETH_NETWORK_CONFIG.tokens.tusd.toLowerCase()]: TUSDIcon,
};

export function TokenIcon({ tokenAddress, className, diameter = 20 }: Props) {
  const Icon = tokenIcons[tokenAddress.toLowerCase()];
  const hasIcon = Icon !== undefined;

  return hasIcon ? (
    <Icon className={className} />
  ) : (
    <JazzIcon diameter={diameter} seed={jsNumberForAddress(tokenAddress)} />
  );
}
