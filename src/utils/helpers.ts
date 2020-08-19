import { LiquidityAmount } from '@akropolis-web/primitives';

import { DEFAULT_LIQUIDITY_CURRENCY } from './mock';

export function getLiquidityAmountsSum(arr: LiquidityAmount[]) {
  return arr.reduce((acc, cur) => acc.add(cur), new LiquidityAmount(0, DEFAULT_LIQUIDITY_CURRENCY));
}
