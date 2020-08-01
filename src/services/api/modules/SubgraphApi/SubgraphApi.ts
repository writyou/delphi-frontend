import { Observable, timer, combineLatest } from 'rxjs';
import ApolloClient from 'apollo-client';
import * as R from 'ramda';
import { map, switchMap } from 'rxjs/operators';
import BN from 'bn.js';

import { memoize } from 'utils/decorators';
import { SavingsPool } from 'model/types';

import { makeSubgraphApi } from './makeSubgraphApi';
import { convertUser, convertSavingsPool } from './converters';
import { SubgraphConfig } from './model';

const RELOAD_APY_HISTORY_TIMEOUT = 1 * 60 * 60 * 1000;
const APY_HISTORY_TIMEOUT = 3 * 24 * 60 * 60 * 1000;

export class SubgraphApi {
  private sdk = makeSubgraphApi(this.apolloClient);

  constructor(private apolloClient: ApolloClient<any>) {}

  @memoize(R.identity)
  public loadUser$(address: string): Observable<User | null> {
    return this.sdk
      .User({
        id: address.toLowerCase(),
        savingsPoolsAPYsDateGT: new BN(Date.now()).toString(),
      })
      .pipe(
        map(({ user }) => {
          return user ? convertUser(user) : null;
        }),
      );
  }

  @memoize(R.identity)
  public loadUserSavingsPools$(address: string): Observable<SavingsPool[]> {
    return timer(0, RELOAD_APY_HISTORY_TIMEOUT).pipe(
      switchMap(() =>
        combineLatest([
          this.loadSubgraphConfig$(),
          this.sdk.User({ id: address.toLowerCase(), savingsPoolsAPYsDateGT: getAPYsDateGT() }),
        ]).pipe(
          map(([{ aprDecimals }, { user }]) => {
            return user ? user.savingsPools.map(pool => convertSavingsPool(pool, aprDecimals)) : [];
          }),
        ),
      ),
    );
  }

  @memoize(R.identity)
  public loadSavingsPool$(address: string): Observable<SavingsPool | null> {
    return timer(0, RELOAD_APY_HISTORY_TIMEOUT).pipe(
      switchMap(() =>
        combineLatest([
          this.loadSubgraphConfig$(),
          this.sdk.SavingsPool({ id: address.toLowerCase(), apysDateGT: getAPYsDateGT() }),
        ]).pipe(
          map(([{ aprDecimals }, { savingsPool }]) => {
            return savingsPool ? convertSavingsPool(savingsPool, aprDecimals) : null;
          }),
        ),
      ),
    );
  }

  @memoize()
  public loadSavingsPools$(): Observable<SavingsPool[]> {
    return timer(0, RELOAD_APY_HISTORY_TIMEOUT).pipe(
      switchMap(() =>
        combineLatest([
          this.loadSubgraphConfig$(),
          this.sdk.SavingsPools({ apysDateGT: getAPYsDateGT() }),
        ]).pipe(
          map(([{ aprDecimals }, { savingsPools }]) => {
            return savingsPools.map(pool => convertSavingsPool(pool, aprDecimals));
          }),
        ),
      ),
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

function getAPYsDateGT(): string {
  return new BN(Date.now()).sub(new BN(APY_HISTORY_TIMEOUT)).divn(1000).toString();
}
