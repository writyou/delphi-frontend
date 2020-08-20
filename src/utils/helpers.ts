import { LiquidityAmount } from '@akropolis-web/primitives';

import { DEFAULT_LIQUIDITY_CURRENCY } from './mock';

// TODO move to @akropolis-web/primitives, make this function generic (T extends Amount)
export function getLiquidityAmountsSum(arr: LiquidityAmount[]) {
  return arr.reduce((acc, cur) => acc.add(cur), new LiquidityAmount(0, DEFAULT_LIQUIDITY_CURRENCY));
}
