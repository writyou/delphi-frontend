import { Amount } from 'model/entities';
import { decimalsToWei } from 'utils/bn';
import { NormalizedAmount } from 'model/types';

export function normalizeAmounts<T extends Amount>(amounts: T[]): NormalizedAmount<T>[] {
  const maxDecimal = amounts
    .map(amount => amount.currency.decimals)
    .reduce((max, current) => (current > max ? current : max));

  return amounts.map(amount => ({
    decimals: maxDecimal,
    original: amount,
    value: amount.toFraction().mul(decimalsToWei(maxDecimal - amount.currency.decimals)),
  }));
}
