/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { Observable, combineLatest } from 'rxjs';
import { autobind } from 'core-decorators';
import BN from 'bn.js';
import { switchMap, map } from 'rxjs/operators';
import * as R from 'ramda';

import { WithdrawFromStakingPool, DepositToStakingPool } from 'model/types';
import { TokenAmount, Token } from 'model/entities';
import { memoize } from 'utils/decorators';
import { StakingPool } from 'model/types/staking';
import { getCurrentValueOrThrow } from 'utils/rxjs';
import { createStakingPool } from 'generated/contracts';
import { ETH_NETWORK_CONFIG } from 'env';

import { Erc20Api } from './Erc20Api';
import { Contracts, Web3ManagerModule } from '../types';
import { TransactionsApi } from './TransactionsApi';

export class StakingModuleApi {
  constructor(
    private web3Manager: Web3ManagerModule,
    private transactionsApi: TransactionsApi,
    private erc20: Erc20Api,
  ) {}

  @memoize()
  public getPools$(): Observable<StakingPool[]> {
    return combineLatest([this.getPool$(ETH_NETWORK_CONFIG.contracts.akroStakingPool)]);
  }

  @memoize(R.identity)
  public getPool$(poolAddress: string): Observable<StakingPool> {
    const akroPoolContract = this.getPoolReadonlyContract(poolAddress);

    return akroPoolContract.methods.token().pipe(
      switchMap(token => this.erc20.getToken$(token)),
      map<Token, StakingPool>(token => ({
        token,
        address: poolAddress,
        poolName: 'AKRO Staking',
      })),
    );
  }

  @memoize((...args: string[]) => args.join())
  public getFullUserBalance$(poolAddress: string, account: string): Observable<TokenAmount> {
    const poolContract = this.getPoolReadonlyContract(poolAddress);

    return combineLatest([
      this.getPool$(poolAddress),
      poolContract.methods.getPersonalStakes(
        {
          _address: account,
        },
        [
          poolContract.events.Staked({ filter: { user: account } }),
          poolContract.events.Unstaked({ filter: { user: account } }),
        ],
      ),
    ]).pipe(
      map(
        ([pool, [, amounts]]) =>
          new TokenAmount(
            amounts.reduce((acc, cur) => acc.add(cur), new BN(0)), // TODO check this
            pool.token,
          ),
      ),
    );
  }

  @memoize(R.identity)
  public getPoolBalance$(poolAddress: string): Observable<TokenAmount> {
    const poolContract = this.getPoolReadonlyContract(poolAddress);

    return combineLatest([
      this.getPool$(poolAddress),
      poolContract.methods.totalStaked(undefined, [
        poolContract.events.Staked(),
        poolContract.events.Unstaked(),
      ]),
    ]).pipe(map(([pool, staked]) => new TokenAmount(staked, pool.token)));
  }

  @autobind
  public async withdraw(withdraw: WithdrawFromStakingPool): Promise<void> {
    console.log('mocked method', withdraw);
  }

  @autobind
  public async deposit(deposit: DepositToStakingPool): Promise<void> {
    console.log('mocked method', deposit);
  }

  private getPoolTxContract(address: string): Contracts['stakingPool'] {
    const txWeb3 = getCurrentValueOrThrow(this.web3Manager.txWeb3$);

    return createStakingPool(txWeb3, address);
  }

  private getPoolReadonlyContract(address: string): Contracts['stakingPool'] {
    return createStakingPool(this.web3Manager.web3, address);
  }
}
