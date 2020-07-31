import BN from 'bn.js';

import type { Amount } from '../entities/Amount';
import type { Fraction } from '../entities/Fraction';

export interface ICurrency {
  readonly symbol: string;
  readonly decimals: number;
  toJSON(): { _type: string };
  equals(a: this): boolean;
}

export type Decimal = {
  integer: string;
  fractional: string;
};

export interface IBrand {
  _type: symbol;
}

export interface IToBN {
  toBN(): BN;
}

export interface IToFraction {
  toFraction(): Fraction;
}

export function isToBN(value: unknown): value is IToBN {
  return typeof value === 'object' && !!value && 'toBN' in value;
}

export interface NormalizedAmount<T extends Amount> {
  decimals: number;
  value: Fraction;
  original: T;
}
