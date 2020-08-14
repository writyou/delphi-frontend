import BN from 'bn.js';

import { tKeys, ITranslateKey } from 'services/i18n';

export function lessThanOrEqual(
  value: BN,
  currentValue: BN,
  formatValue?: (value: BN) => string,
  errorKey?: string,
): ITranslateKey | undefined {
  const isValid = value.gte(new BN(currentValue));

  return isValid
    ? undefined
    : {
        key: errorKey || tKeys.utils.validation.lessThanOrEqual.getKey(),
        params: { value: formatValue ? formatValue(value) : String(value) },
      };
}
