import { MaybeArray } from '../../components/DeprecatedLoading';

export function toArray<T>(value: MaybeArray<T>): T[] {
  return Array.isArray(value) ? value : [value];
}
