import { useMemo } from 'react';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import BN from 'bn.js';
import { Amount, IToBN } from '@akropolis-web/primitives';

import {
  isRequired,
  validatePositiveNumber,
  moreThan,
  lessThanOrEqual,
  moreThanOrEqual,
} from 'utils/validators';
import { toObservable } from 'utils/rxjs';

import { useSubscribable } from './useSubscribable';

interface ValidateAmountOptions {
  required?: boolean;
  positive?: boolean;
  moreThanZero?: boolean;
  maxValue?: BN | IToBN | Observable<BN | IToBN>;
  maxErrorTKey?: string;
  minValue?: BN | IToBN | Observable<BN | IToBN>;
}

// TODO return validation error if not all Observables is loaded
export function useValidateAmount(options: ValidateAmountOptions) {
  const { positive, required, moreThanZero, maxErrorTKey } = options;

  const amplitudeValuesRD = useSubscribable<{
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
  );

  const { maxValue, minValue } = amplitudeValuesRD.toUndefined() || {};

  return useMemo(() => {
    return (amount: '' | Amount | null) => {
      if (!amount) {
        return required ? isRequired(amount) : undefined;
      }
      return (
        (positive && validatePositiveNumber(amount.toBN())) ||
        (moreThanZero && moreThan(new BN(0), amount.toBN())) ||
        (minValue &&
          moreThanOrEqual(minValue, amount.toBN(), () =>
            amount.withValue(minValue).toFormattedString(amount.currency.decimals),
          )) ||
        (maxValue &&
          lessThanOrEqual(
            maxValue,
            amount.toBN(),
            () => amount.withValue(maxValue).toFormattedString(amount.currency.decimals),
            maxErrorTKey,
          ))
      );
    };
  }, [maxValue?.toString(), minValue?.toString(), maxErrorTKey]);
}
