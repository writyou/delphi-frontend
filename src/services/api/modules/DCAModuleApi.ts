/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { Observable, of } from 'rxjs';
import { autobind } from 'core-decorators';
import BN from 'bn.js';

import { DCAPool, WithdrawFromDCAPool, DepositToDCAPool, ChangeWeeklyDCAAmount } from 'model/types';
import { LiquidityAmount, Currency, TokenAmount } from 'model/entities';
import { memoize } from 'utils/decorators';
import { zeroAddress, mockedTokens, percentAmount } from 'utils/mock';
import { decimalsToWei } from 'utils/bn';

const tokenToSell = mockedTokens[0];

const DCAPoolsMock: DCAPool[] = [
  {
    address: zeroAddress,
    poolName: 'poolName1',
    tokenToSell,
    apy: percentAmount,
    tokens: mockedTokens,
  },
  {
    address: zeroAddress,
    poolName: 'poolName2',
    tokenToSell,
    apy: percentAmount,
    tokens: mockedTokens,
  },
  {
    address: zeroAddress,
    poolName: 'poolName3',
    tokenToSell,
    apy: percentAmount,
    tokens: mockedTokens,
  },
];

const liquidityAmount = new LiquidityAmount('123000000000000000000', new Currency('$', 18));

export class DCAModuleApi {
  public getPools$() {
    return of(DCAPoolsMock);
  }

  @memoize((...args: string[]) => args.join())
  public getUserBalance$(poolAddress: string, account: string): Observable<LiquidityAmount> {
    console.log('mocked method', poolAddress, account);
    return of(liquidityAmount);
  }

  @memoize((...args: string[]) => args.join())
  public getTokenToSellBalance$(poolAddress: string, account: string): Observable<TokenAmount> {
    console.log('mocked method', poolAddress, account);
    return of(new TokenAmount(new BN(100).mul(decimalsToWei(tokenToSell.decimals)), tokenToSell));
  }

  @memoize((...args: string[]) => args.join())
  public getPoolBalance$(poolAddress: string): Observable<LiquidityAmount> {
    console.log('mocked method', poolAddress);
    return of(liquidityAmount);
  }

  @autobind
  public async withdraw(withdraw: WithdrawFromDCAPool): Promise<void> {
    console.log('mocked method', withdraw);
  }

  @autobind
  public async withdrawAll(withdraw: WithdrawFromDCAPool): Promise<void> {
    console.log('mocked method', withdraw);
  }

  @autobind
  public async deposit(deposit: DepositToDCAPool): Promise<void> {
    console.log('mocked method', deposit);
  }

  @autobind
  public async change(deposit: ChangeWeeklyDCAAmount): Promise<void> {
    console.log('mocked method', deposit);
  }
}
