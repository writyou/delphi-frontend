import { useMemo } from 'react';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import { Amount, IToBN } from '@akropolis-web/primitives';

import {
  isRequired,
  validatePositiveNumber,
  moreThen,
  lessThenOrEqual,
  moreThenOrEqual,
} from 'utils/validators';
import { toObservable } from 'utils/rxjs';

import { useSubscribable } from './useSubscribable';

interface ValidateAmountOptions {
  required?: boolean;
  positive?: boolean;
  moreThenZero?: boolean;
  maxValue?: BN | IToBN | Observable<BN | IToBN>;
  maxErrorTKey?: string;
  minValue?: BN | IToBN | Observable<BN | IToBN>;
}

// TODO return validation error if not all Observables is loaded
export function useValidateAmount(options: ValidateAmountOptions) {
  const { positive, required, moreThenZero, maxErrorTKey } = options;

  const [{ maxValue, minValue }] = useSubscribable<{
    maxValue?: BN;
    minValue?: BN;
  }>(
    () =>
      combineLatest([toObservable(options.maxValue), toObservable(options.minValue)]).pipe(
        map(([max, min]) => ({
          maxValue: BN.isBN(max) ? max : max?.toBN(),
          minValue: BN.isBN(min) ? min : min?.toBN(),
        })),
      ),
    [options.maxValue, options.minValue],
    {},
  );

  return useMemo(() => {
    return (amount: '' | Amount | null) => {
      if (!amount) {
        return required ? isRequired(amount) : undefined;
      }
      return (
        (positive && validatePositiveNumber(amount.toBN())) ||
        (moreThenZero && moreThen(new BN(0), amount.toBN())) ||
        (minValue &&
          moreThenOrEqual(minValue, amount.toBN(), () =>
            amount.withValue(minValue).toFormattedString(),
          )) ||
        (maxValue &&
          lessThenOrEqual(
            maxValue,
            amount.toBN(),
            () => amount.withValue(maxValue).toFormattedString(),
            maxErrorTKey,
          ))
      );
    };
  }, [maxValue?.toString(), minValue?.toString(), maxErrorTKey]);
}
