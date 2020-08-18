import { PercentAmount, Fraction } from '@akropolis-web/primitives';

export function roundPercentAmount(value: PercentAmount) {
  return new PercentAmount(new Fraction(Math.round(value.toNumber() * 100), 100));
}
