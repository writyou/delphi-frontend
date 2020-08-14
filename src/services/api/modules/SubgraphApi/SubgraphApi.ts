import { Observable, combineLatest, of, merge } from 'rxjs';
import ApolloClient from 'apollo-client';
import * as R from 'ramda';
import { map, switchMap } from 'rxjs/operators';

import { memoize } from 'utils/decorators';
import { SavingsPool } from 'model/types';

import { makeSubgraphApi } from './makeSubgraphApi';
import { convertUser, convertSavingsPool } from './converters';
import { SubgraphConfig } from './model';

export class SubgraphApi {
  private sdk = makeSubgraphApi(this.apolloClient);
  private getEventsForReloadUserSavingsPools$: (a: string) => Observable<any> = () => of(true);
  private getEventsForReloadUser$: (a: string) => Observable<any> = () => of(true);
  private getEventsForReloadSavingsPools$: () => Observable<any> = () => of(true);

  constructor(private apolloClient: ApolloClient<any>) {}

  public setEventsForReloadUserSavingsPoolsGetter(
    getEventsForReloadUserSavingsPools$: (a: string) => Observable<any>,
  ) {
    this.getEventsForReloadUserSavingsPools$ = getEventsForReloadUserSavingsPools$;
  }

  public setEventsForReloadUserGetter(getEventsForReloadUser$: (a: string) => Observable<any>) {
    this.getEventsForReloadUser$ = getEventsForReloadUser$;
  }

  public setEventsForReloadSavingsPoolsGetter(
    getEventsForReloadSavingsPools$: () => Observable<any>,
  ) {
    this.getEventsForReloadSavingsPools$ = getEventsForReloadSavingsPools$;
  }

  @memoize()
  public loadGlobalStats$() {
    return this.sdk.GlobalStats().pipe(
      map(({ globalStat }) => {
        return { activeMembersCount: globalStat?.activeMembersCount || 0 };
      }),
    );
  }

  @memoize(R.identity)
  public loadUser$(address: string): Observable<User | null> {
    return merge([of(true), this.getEventsForReloadUser$(address)]).pipe(
      switchMap(() =>
        this.sdk
          .User({
            id: address.toLowerCase(),
          })
          .pipe(
            map(({ user }) => {
              return user ? convertUser(user) : null;
            }),
          ),
      ),
    );
  }

  @memoize(R.identity)
  public loadUserSavingsPools$(userAddress: string): Observable<SavingsPool[]> {
    return merge([of(true), this.getEventsForReloadUserSavingsPools$(userAddress)]).pipe(
      switchMap(() =>
        combineLatest([
          this.loadSubgraphConfig$(),
          this.sdk.User({ id: userAddress.toLowerCase() }),
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
    return merge([of(true), this.getEventsForReloadSavingsPools$()]).pipe(
      switchMap(() =>
        combineLatest([this.loadSubgraphConfig$(), this.sdk.SavingsPools()]).pipe(
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
