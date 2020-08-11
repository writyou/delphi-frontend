import { SIGNIFICANT_FRACTIONAL_DIGITS } from 'env';

import { decimalsToWei } from './decimalsToWei';

export function getSignificantValue(decimals: number) {
  return decimalsToWei(Math.max(0, decimals - SIGNIFICANT_FRACTIONAL_DIGITS));
}
