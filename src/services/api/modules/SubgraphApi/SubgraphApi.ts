import { Observable, combineLatest } from 'rxjs';
import ApolloClient from 'apollo-client';
import * as R from 'ramda';
import { map } from 'rxjs/operators';

import { memoize } from 'utils/decorators';
import { SavingsPool } from 'model/types';

import { makeSubgraphApi } from './makeSubgraphApi';
import { convertUser, convertSavingsPool } from './converters';
import { SubgraphConfig } from './model';

export class SubgraphApi {
  private sdk = makeSubgraphApi(this.apolloClient);

  constructor(private apolloClient: ApolloClient<any>) {}

  @memoize()
  public loadUsersLength$(): Observable<number> {
    // TODO use another query, it should be aggregated in subgraph
    return this.sdk.AllUsers().pipe(
      map(({ users }) => {
        return users.length;
      }),
    );
  }

  @memoize(R.identity)
  public loadUser$(address: string): Observable<User | null> {
    return this.sdk
      .User({
        id: address.toLowerCase(),
      })
      .pipe(
        map(({ user }) => {
          return user ? convertUser(user) : null;
        }),
      );
  }

  @memoize(R.identity)
  public loadUserSavingsPools$(address: string): Observable<SavingsPool[]> {
    return combineLatest([
      this.loadSubgraphConfig$(),
      this.sdk.User({ id: address.toLowerCase() }),
    ]).pipe(
      map(([{ aprDecimals }, { user }]) => {
        return user ? user.savingsPools.map(pool => convertSavingsPool(pool, aprDecimals)) : [];
      }),
    );
  }

  @memoize(R.identity)
  public loadSavingsPool$(address: string): Observable<SavingsPool | null> {
    return combineLatest([
      this.loadSubgraphConfig$(),
      this.sdk.SavingsPool({ id: address.toLowerCase() }),
    ]).pipe(
      map(([{ aprDecimals }, { savingsPool }]) => {
        return savingsPool ? convertSavingsPool(savingsPool, aprDecimals) : null;
      }),
    );
  }

  @memoize()
  public loadSavingsPools$(): Observable<SavingsPool[]> {
    return combineLatest([this.loadSubgraphConfig$(), this.sdk.SavingsPools()]).pipe(
      map(([{ aprDecimals }, { savingsPools }]) => {
        return savingsPools.map(pool => convertSavingsPool(pool, aprDecimals));
      }),
    );
  }

  @memoize()
  private loadSubgraphConfig$(): Observable<SubgraphConfig> {
    return this.sdk.SubgraphConfig().pipe(
      map(({ subgraphConfig }) => {
        if (!subgraphConfig) throw new Error('Subgraph config is not found');
        return { aprDecimals: subgraphConfig.aprDecimals };
      }),
    );
  }
}
