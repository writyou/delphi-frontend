import { Observable, empty } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as R from 'ramda';

import { memoize } from 'utils/decorators';
import { TokenAmount } from 'model/entities';

import { Erc20Api } from './Erc20Api';
import { SubgraphApi } from './SubgraphApi/SubgraphApi';
import { Web3Manager } from './Web3Manager';

export class UserApi {
  constructor(
    private web3Manager: Web3Manager,
    private erc20: Erc20Api,
    private subgraph: SubgraphApi,
  ) {}

  @memoize(R.identity)
  public getUser(): Observable<User | null> {
    return this.web3Manager.account.pipe(
      switchMap(account => (account ? this.subgraph.loadUser(account) : empty())),
    );
  }

  @memoize(R.identity)
  public getTokenBalance(address: string): Observable<TokenAmount> {
    return this.web3Manager.account.pipe(
      switchMap(account => (account ? this.erc20.getBalance$(address, account) : empty())),
    );
  }
}
