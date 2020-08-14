import BN from 'bn.js';
import { IToBN, bnToBn, formatInteger } from '@akropolis-web/primitives';

export function formatNumber<ExtToBn extends IToBN>(value?: ExtToBn | BN | number | null): string {
  return formatInteger(bnToBn(value).toString());
}
