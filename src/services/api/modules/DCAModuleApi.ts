/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { Observable, of } from 'rxjs';
import { autobind } from 'core-decorators';
import BN from 'bn.js';
import {
  LiquidityAmount,
  Currency,
  TokenAmount,
  Token,
  decimalsToWei,
} from '@akropolis-web/primitives';

import { DCAPool, WithdrawFromDCAPool, DepositToDCAPool, ChangeWeeklyDCAAmount } from 'model/types';
import { memoize } from 'utils/decorators';
import { zeroAddress, mockedTokens, percentAmount } from 'utils/mock';
import { ETH_NETWORK_CONFIG } from 'env';

const tokenToSell = mockedTokens[0];
const WETH = new Token(ETH_NETWORK_CONFIG.tokens.WETH.toLowerCase(), 'WETH', 18);
const AKRO = new Token(ETH_NETWORK_CONFIG.tokens.AKRO.toLowerCase(), 'AKRO', 18);
const renBTC = new Token(ETH_NETWORK_CONFIG.tokens.renBTC.toLowerCase(), 'renBTC', 18);
const WBTC = new Token(ETH_NETWORK_CONFIG.tokens.WBTC.toLowerCase(), 'WBTC', 18);
const sBTC = new Token(ETH_NETWORK_CONFIG.tokens.sBTC.toLowerCase(), 'sBTC', 18);

const DCAPoolsMock: DCAPool[] = [
  {
    address: zeroAddress,
    poolName: 'sBTC Curve',
    tokenToSell,
    apy: percentAmount,
    tokens: [WBTC, renBTC, sBTC],
  },
  {
    address: zeroAddress.replace(/0$/, '1'),
    poolName: 'WBTC/WETH Balancer',
    tokenToSell,
    apy: percentAmount,
    tokens: [WBTC, WETH],
  },
  {
    address: zeroAddress.replace(/0$/, '2'),
    poolName: 'AKRO/WETH Balancer',
    tokenToSell,
    apy: percentAmount,
    tokens: [AKRO, WETH],
  },
];

const liquidityAmount = new LiquidityAmount('0', new Currency('$', 18));

export class DCAModuleApi {
  public getPools$() {
    return of(DCAPoolsMock);
  }

  @memoize((...args: string[]) => args.join())
  public getUserBalance$(poolAddress: string, account: string): Observable<LiquidityAmount> {
    onlyDev(() => console.log('mocked method', poolAddress, account));
    return of(liquidityAmount);
  }

  @memoize((...args: string[]) => args.join())
  public getTokenToSellBalance$(poolAddress: string, account: string): Observable<TokenAmount> {
    onlyDev(() => console.log('mocked method', poolAddress, account));
    return of(new TokenAmount(new BN(100).mul(decimalsToWei(tokenToSell.decimals)), tokenToSell));
  }

  @memoize((...args: string[]) => args.join())
  public getPoolBalance$(poolAddress: string): Observable<LiquidityAmount> {
    onlyDev(() => console.log('mocked method', poolAddress));
    return of(liquidityAmount);
  }

  @autobind
  public async withdraw(withdraw: WithdrawFromDCAPool): Promise<void> {
    onlyDev(() => console.log('mocked method', withdraw));
  }

  @autobind
  public async withdrawAll(withdraw: WithdrawFromDCAPool): Promise<void> {
    onlyDev(() => console.log('mocked method', withdraw));
  }

  @autobind
  public async deposit(deposit: DepositToDCAPool): Promise<void> {
    onlyDev(() => console.log('mocked method', deposit));
  }

  @autobind
  public async change(deposit: ChangeWeeklyDCAAmount): Promise<void> {
    onlyDev(() => console.log('mocked method', deposit));
  }
}

function onlyDev(callback: () => void) {
  if (process.env.NODE_ENV === 'development') {
    callback();
  }
}
