import React from 'react';
import cn from 'classnames';

import {
  USDCIcon,
  USDTIcon,
  TUSDIcon,
  DAIIcon,
  renBTCIcon,
  WBTCIcon,
  sBTCIcon,
  AKROIcon,
  ETHIcon,
} from 'components/icons';
import { ETH_NETWORK_CONFIG } from 'env';
import { makeStyles } from 'utils/styles';

import { AddressIcon } from '../AddressIcon/AddressIcon';

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

  [ETH_NETWORK_CONFIG.tokens.renBTC.toLowerCase()]: renBTCIcon,
  [ETH_NETWORK_CONFIG.tokens.WBTC.toLowerCase()]: WBTCIcon,
  [ETH_NETWORK_CONFIG.tokens.sBTC.toLowerCase()]: sBTCIcon,
  [ETH_NETWORK_CONFIG.tokens.AKRO.toLowerCase()]: AKROIcon,
  [ETH_NETWORK_CONFIG.tokens.WETH.toLowerCase()]: ETHIcon,
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
    <div className={cn(classes.addressIcon, className)}>
      <AddressIcon address={tokenAddress} />
    </div>
  );
}

const useStyles = makeStyles(
  {
    addressIcon: {
      display: 'inline-flex',
    },
  },
  { name: 'TokenIcon' },
);