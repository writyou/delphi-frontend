/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { Observable, of } from 'rxjs';
import { autobind } from 'core-decorators';
import BN from 'bn.js';

import { WithdrawFromStakingPool, DepositToStakingPool } from 'model/types';
import { LiquidityAmount, Currency, TokenAmount } from 'model/entities';
import { memoize } from 'utils/decorators';
import { zeroAddress, mockedTokens, ALL_TOKEN, mockedTokenAmounts } from 'utils/mock';
import { decimalsToWei } from 'utils/bn';
import { StakingPool } from 'model/types/staking';

const tokenToSell = mockedTokens[0];

const StakingPoolsMock: StakingPool[] = [
  {
    address: zeroAddress,
    poolName: 'Akro Staking',
    poolToken: ALL_TOKEN,
    tokens: mockedTokens,
  },
  {
    address: zeroAddress,
    poolName: 'poolName2',
    poolToken: ALL_TOKEN,
    tokens: mockedTokens,
  },
  {
    address: zeroAddress,
    poolName: 'poolName3',
    poolToken: ALL_TOKEN,
    tokens: mockedTokens,
  },
];

const liquidityAmount = new LiquidityAmount('123000000000000000000', new Currency('$', 18));

export class StakingModuleApi {
  public getPools$() {
    return of(StakingPoolsMock);
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

  @memoize((...args: string[]) => args.join())
  public getPoolBalances$(poolAddress: string): Observable<TokenAmount[]> {
    console.log('mocked method', poolAddress);
    return of(mockedTokenAmounts);
  }

  @autobind
  public async withdraw(withdraw: WithdrawFromStakingPool): Promise<void> {
    console.log('mocked method', withdraw);
  }

  @autobind
  public async deposit(deposit: DepositToStakingPool): Promise<void> {
    console.log('mocked method', deposit);
  }
}
