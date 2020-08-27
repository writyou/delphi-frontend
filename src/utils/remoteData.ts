/* eslint-disable max-classes-per-file */
type NotAskedT = { tag: 'NOT_ASKED' };
type LoadingT = { tag: 'LOADING' };
type FailureT<E> = { tag: 'FAILURE'; error: E };
type SuccessT<R> = { tag: 'SUCCESS'; data: R };

type RemoteDataT<R, E> = NotAskedT | LoadingT | FailureT<E> | SuccessT<R>;

export class RemoteData<R, E = string> {
  constructor(public value: RemoteDataT<R, E>) {}

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
}

class NotAsked extends RemoteData<never, never> {
  constructor() {
    super({ tag: 'NOT_ASKED' });
  }
}

class Loading extends RemoteData<never, never> {
  constructor() {
    super({ tag: 'LOADING' });
  }
}

class Failure<R, E> extends RemoteData<R, E> {
  constructor(error: E) {
    super({ tag: 'FAILURE', error });
  }
}

class Success<R, E> extends RemoteData<R, E> {
  constructor(data: R) {
    super({ tag: 'SUCCESS', data });
  }
}

export const notAsked: NotAsked = new NotAsked();
export const loading: Loading = new Loading();
export const failure = <R, E>(error: E): Failure<R, E> => new Failure(error);
export const success = <R, E>(data: R): Success<R, E> => new Success(data);

export const isNotAsked = (x: RemoteData<unknown, unknown>): x is NotAsked =>
  x.value.tag === 'NOT_ASKED';
export const isLoading = (x: RemoteData<unknown, unknown>): x is Loading =>
  x.value.tag === 'LOADING';
export const isFailure = <R, E>(x: RemoteData<unknown, E>): x is Failure<R, E> =>
  x.value.tag === 'FAILURE';
export const isSuccess = <R, E>(x: RemoteData<R, unknown>): x is Success<R, E> =>
  x.value.tag === 'SUCCESS';
