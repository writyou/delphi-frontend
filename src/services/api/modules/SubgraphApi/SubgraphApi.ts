import { Observable } from 'rxjs';
import ApolloClient from 'apollo-client';
import * as R from 'ramda';
import { map } from 'rxjs/operators';

import { memoize } from 'utils/decorators';
import { SavingsPool } from 'model/types';

import { makeSubgraphApi } from './makeSubgraphApi';
import { convertUser, convertSavingsPool } from './converters';

export class SubgraphApi {
  private sdk = makeSubgraphApi(this.apolloClient);

  constructor(private apolloClient: ApolloClient<any>) {}

  @memoize(R.identity)
  public loadUser$(address: string): Observable<User | null> {
    return this.sdk.User({ id: address.toLowerCase() }).pipe(
      map(({ user }) => {
        return user ? convertUser(user) : null;
      }),
    );
  }

  @memoize(R.identity)
  public loadSavingsPool$(address: string): Observable<SavingsPool | null> {
    return this.sdk.SavingsPool({ id: address.toLowerCase() }).pipe(
      map(({ savingsPool }) => {
        return savingsPool ? convertSavingsPool(savingsPool) : null;
      }),
    );
  }

  @memoize()
  public loadSavingsPools$(): Observable<SavingsPool[]> {
    return this.sdk.SavingsPools().pipe(
      map(({ savingsPools }) => {
        return savingsPools.map(convertSavingsPool);
      }),
    );
  }
}
