import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import * as R from 'ramda';
import { autobind } from 'core-decorators';

import { memoize } from 'utils/decorators';
import { createErc20 } from 'generated/contracts';
import { Token, TokenAmount } from 'model/entities';
import { getCurrentValueOrThrow, awaitFirst } from 'utils/rxjs';

import { Contracts, Web3ManagerModule } from '../types';
import { TransactionsApi } from './TransactionsApi';

export class Erc20Api {
  constructor(private web3Manager: Web3ManagerModule, private transactionsApi: TransactionsApi) {}

  @autobind
  public async approveMultiple(
    fromAddress: string,
    spender: string,
    amounts: TokenAmount[],
  ): Promise<void> {
    await Promise.all(amounts.map(amount => this.approve(fromAddress, spender, amount)));
  }

  @autobind
  public async approve(fromAddress: string, spender: string, amount: TokenAmount): Promise<void> {
    const txDai = this.getErc20TxContract(amount.currency.address);

    const allowance = await awaitFirst(
      this.getAllowance$(amount.currency.address, fromAddress, spender),
    );

    if (allowance.gte(amount.toBN())) {
      return;
    }

    const promiEvent = txDai.methods.approve(
      { spender, amount: amount.toBN() },
      { from: fromAddress },
    );

    this.transactionsApi.pushToSubmittedTransactions('erc20.approve', promiEvent, {
      spender,
      fromAddress,
      value: amount,
    });

    await promiEvent;
  }

  @memoize(R.identity)
  public getToken$(address: string): Observable<Token> {
    const contract = this.getErc20ReadonlyContract(address);

    return combineLatest([contract.methods.symbol(), contract.methods.decimals()]).pipe(
      map(([symbol, decimals]) => new Token(address, symbol, decimals.toNumber())),
    );
  }

  @autobind
  public toTokenAmount$(tokenAddress: string, amount$: Observable<BN>): Observable<TokenAmount> {
    return combineLatest([this.getToken$(tokenAddress), amount$]).pipe(
      map(([token, amount]) => new TokenAmount(amount, token)),
    );
  }

  @memoize((...args: string[]) => args.join())
  public getBalance$(tokenAddress: string, account: string): Observable<TokenAmount> {
    const contract = this.getErc20ReadonlyContract(tokenAddress);

    return this.toTokenAmount$(
      tokenAddress,
      contract.methods.balanceOf({ account }, [
        contract.events.Transfer({ filter: { from: account } }),
        contract.events.Transfer({ filter: { to: account } }),
      ]),
    );
  }

  @memoize((...args: string[]) => args.join())
  public getAllowance$(tokenAddress: string, owner: string, spender: string): Observable<BN> {
    const contract = this.getErc20ReadonlyContract(tokenAddress);

    return contract.methods.allowance({ owner, spender }, [
      contract.events.Transfer({ filter: { from: owner } }),
      contract.events.Approval({ filter: { owner, spender } }),
    ]);
  }

  @memoize(R.identity)
  public getTotalSupply$(address: string): Observable<TokenAmount> {
    const contract = this.getErc20ReadonlyContract(address);
    return this.toTokenAmount$(
      address,
      contract.methods.totalSupply(undefined, contract.events.Transfer()),
    );
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public hasInfinityApprove(_tokenAddress: string, _account: string, _spender: string) {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  public infiniteApproveMultiple(fromAddress: string, spender: string, tokens: Token[]) {
    return { fromAddress, spender, tokens };
  }

  // eslint-disable-next-line class-methods-use-this
  public revertInfiniteApproveMultiple(fromAddress: string, spender: string, tokens: Token[]) {
    return { fromAddress, spender, tokens };
  }

  private getErc20TxContract(address: string): Contracts['erc20'] {
    const txWeb3 = getCurrentValueOrThrow(this.web3Manager.txWeb3$);

    return createErc20(txWeb3, address);
  }

  private getErc20ReadonlyContract(address: string): Contracts['erc20'] {
    return createErc20(this.web3Manager.web3, address);
  }
}
