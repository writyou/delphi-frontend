import React from 'react';
import cn from 'classnames';

import * as icons from 'components/icons';
import { ETH_NETWORK_CONFIG } from 'env';
import { makeStyles } from 'utils/styles';

import { AddressIcon } from '../AddressIcon';

type Props = {
  tokenAddress: string;
  className?: string;
};
type CoinComponent = typeof icons.DAIIcon;

export const tokenIcons: Record<string, CoinComponent> = {
  [ETH_NETWORK_CONFIG.tokens.DAI.toLowerCase()]: icons.DAIIcon,
  [ETH_NETWORK_CONFIG.tokens.USDC.toLowerCase()]: icons.USDCIcon,
  [ETH_NETWORK_CONFIG.tokens.USDT.toLowerCase()]: icons.USDTIcon,
  [ETH_NETWORK_CONFIG.tokens.TUSD.toLowerCase()]: icons.TUSDIcon,
  [ETH_NETWORK_CONFIG.tokens.renBTC.toLowerCase()]: icons.renBTCIcon,
  [ETH_NETWORK_CONFIG.tokens.WBTC.toLowerCase()]: icons.WBTCIcon,
  [ETH_NETWORK_CONFIG.tokens.sBTC.toLowerCase()]: icons.sBTCIcon,
  [ETH_NETWORK_CONFIG.tokens.AKRO.toLowerCase()]: icons.AKROIcon,
  [ETH_NETWORK_CONFIG.tokens.WETH.toLowerCase()]: icons.ETHIcon,
  [ETH_NETWORK_CONFIG.tokens.COMP.toLowerCase()]: icons.COMPIcon,
  [ETH_NETWORK_CONFIG.tokens.ADEL.toLowerCase()]: icons.ADELIcon,
  [ETH_NETWORK_CONFIG.tokens.sUSD.toLowerCase()]: icons.sUSDIcon,
  [ETH_NETWORK_CONFIG.tokens.BAL.toLowerCase()]: icons.BALIcon,
  [ETH_NETWORK_CONFIG.tokens.CRV.toLowerCase()]: icons.CRVIcon,
  [ETH_NETWORK_CONFIG.tokens.MTA.toLowerCase()]: icons.MTAIcon,
  [ETH_NETWORK_CONFIG.tokens.YFI.toLowerCase()]: icons.YFIIcon,
  [ETH_NETWORK_CONFIG.tokens.SNX.toLowerCase()]: icons.SNXIcon,
  [ETH_NETWORK_CONFIG.tokens.bUSD.toLowerCase()]: icons.BUSDIcon,
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
