/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-useless-constructor */

type NotAskedT = { tag: 'NOT_ASKED' };
type LoadingT = { tag: 'LOADING' };
type FailureT<E> = { tag: 'FAILURE'; error: E };
type SuccessT<R> = { tag: 'SUCCESS'; data: R };

type RemoteDataT<R, E> = NotAskedT | LoadingT | FailureT<E> | SuccessT<R>;

export abstract class RemoteData<R, E = string> {
  public abstract value: RemoteDataT<R, E>;

  public fold<O>(
    onNotAsked: () => O,
    onLoading: () => O,
    onFailure: (error: E) => O,
    onSuccess: (data: R) => O,
  ): O {
    const { value } = this;
    switch (value.tag) {
      case 'NOT_ASKED': {
        return onNotAsked();
      }
      case 'LOADING': {
        return onLoading();
      }
      case 'FAILURE': {
        return onFailure(value.error);
      }
      case 'SUCCESS': {
        return onSuccess(value.data);
      }
    }
  }

  public map<T>(fn: (x: R) => T): RemoteData<T, E> {
    return isSuccess(this) ? success(fn(this.value.data)) : (this as any);
  }
}

export function combine<A, B, E>(a: RemoteData<A, E>, b: RemoteData<B, E>): RemoteData<[A, B], E>;
export function combine<A, B, C, E>(
  a: RemoteData<A, E>,
  b: RemoteData<B, E>,
  c: RemoteData<C, E>,
): RemoteData<[A, B, C], E>;

export function combine<A, B, C, D, E>(
  a: RemoteData<A, E>,
  b: RemoteData<B, E>,
  c: RemoteData<C, E>,
  d: RemoteData<D, E>,
): RemoteData<[A, B, C, D], E>;

export function combine<A, B, C, D, E>(
  a: RemoteData<A, E>,
  b: RemoteData<B, E>,
  c?: RemoteData<C, E>,
  d?: RemoteData<D, E>,
): RemoteData<[A, B] | [A, B, C] | [A, B, C, D], E> {
  const all = [a, b, c, d].filter(Boolean);
  const firstFailure = all.find(isFailure as any);
  if (firstFailure) {
    return firstFailure as any;
  }
  const firstLoading = all.find(isLoading as any);
  if (firstLoading) {
    return firstLoading as any;
  }
  if (all.every(isSuccess as any)) {
    return success((all as any).map((x: Success<any>) => x.value.data));
  }
  return notAsked;
}

class NotAsked extends RemoteData<never, never> {
  public value: NotAskedT = { tag: 'NOT_ASKED' };
  constructor() {
    super();
  }
}

class Loading extends RemoteData<never, never> {
  public value: LoadingT = { tag: 'LOADING' };
  constructor() {
    super();
  }
}

class Failure<E> extends RemoteData<never, E> {
  public value: FailureT<E>;
  constructor(error: E) {
    super();
    this.value = { tag: 'FAILURE', error };
  }
}

class Success<R> extends RemoteData<R, never> {
  public value: SuccessT<R>;
  constructor(data: R) {
    super();
    this.value = { tag: 'SUCCESS', data };
  }
}

export function isNotAsked(x: RemoteData<unknown, unknown>): x is NotAsked {
  return x.value.tag === 'NOT_ASKED';
}
export function isLoading(x: RemoteData<unknown, unknown>): x is Loading {
  return x.value.tag === 'LOADING';
}
export function isFailure<E>(x: RemoteData<unknown, E>): x is Failure<E> {
  return x.value.tag === 'FAILURE';
}
export function isSuccess<R>(x: RemoteData<R, unknown>): x is Success<R> {
  return x.value.tag === 'SUCCESS';
}

export const notAsked: NotAsked = new NotAsked();
export const loading: Loading = new Loading();
export function failure<E>(error: E): Failure<E> {
  return new Failure(error);
}
export function success<R>(data: R): Success<R> {
  return new Success(data);
}
