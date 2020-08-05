/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { Observable, of } from 'rxjs';
import { autobind } from 'core-decorators';

import { DCAPool, WithdrawFromDCAPool, DepositToDCAPool } from 'model/types';
import { Token, LiquidityAmount } from 'model/entities';
import { memoize } from 'utils/decorators';
import { zeroAddress, mockedTokens, percentAmount, liquidityAmount } from 'utils/mock';

const DCAPoolsMock: DCAPool[] = [
  {
    address: zeroAddress,
    poolName: 'poolName1',
    poolToken: new Token(zeroAddress, 'MOCK1', 18),
    apy: percentAmount,
    tokens: mockedTokens,
  },
  {
    address: zeroAddress,
    poolName: 'poolName2',
    poolToken: new Token(zeroAddress, 'MOCK1', 18),
    apy: percentAmount,
    tokens: mockedTokens,
  },
  {
    address: zeroAddress,
    poolName: 'poolName3',
    poolToken: new Token(zeroAddress, 'MOCK1', 18),
    apy: percentAmount,
    tokens: mockedTokens,
  },
];

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
  public async change(deposit: DepositToDCAPool): Promise<void> {
    console.log('mocked method', deposit);
  }
}
