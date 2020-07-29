import { Amount } from 'model/entities';
import { Fraction } from 'model/entities/Fraction';
import { decimalsToWei } from 'utils/bn';

interface NormalizedAmount<T extends Amount<any>> {
  decimals: number;
  value: Fraction;
  original: T;
}

export function normalizeAmounts<T extends Amount<any>>(amounts: T[]): NormalizedAmount<T>[] {
  const maxDecimal = amounts
    .map(amount => amount.currency.decimals)
    .reduce((max, current) => (current > max ? current : max));

  return amounts.map(amount => ({
    decimals: maxDecimal,
    original: amount,
    value: amount.toFraction().mul(decimalsToWei(maxDecimal - amount.currency.decimals)),
  }));
}
