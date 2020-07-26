import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as R from 'ramda';

import { memoize } from 'utils/decorators';
import { SavingsPool } from 'model/types';
import { Token } from 'model/entities';
import * as SR from 'generated/gql/subgraphRequests';

import { Web3ManagerModule } from '../types';
import { Erc20Api } from './Erc20Api';
import { SubgraphApi } from './SubgraphApi.model';
import { TransactionsApi } from './TransactionsApi';

export class SavingsModuleApi {
  constructor(
    private web3Manager: Web3ManagerModule,
    private transactionsApi: TransactionsApi,
    private erc20: Erc20Api,
    private subgraph: SubgraphApi,
  ) {}

  @memoize()
  public getPools(): Observable<SavingsPool[]> {
    return this.subgraph
      .SavingsPools()
      .pipe(map(({ savingsPools }) => savingsPools.map<SavingsPool>(convertSavingsPool)));
  }

  @memoize(R.identity)
  public getPool(address: string): Observable<SavingsPool | null> {
    return this.subgraph
      .SavingsPool({ id: address.toLowerCase() })
      .pipe(map(({ savingsPool }) => (savingsPool ? convertSavingsPool(savingsPool) : null)));
  }
}
function convertSavingsPool(
  d: Pick<SR.SavingsPool, 'id'> & {
    poolToken: Pick<SR.Token, 'symbol' | 'id' | 'name' | 'decimals'>;
    tokens: Pick<SR.Token, 'symbol' | 'id' | 'decimals'>[];
  },
): SavingsPool {
  return {
    address: d.id,
    devName: d.poolToken.name,
    poolToken: new Token(d.poolToken.id, d.poolToken.symbol, d.poolToken.decimals),
    tokens: d.tokens.map(token => new Token(token.id, token.symbol, token.decimals)),
  };
}
