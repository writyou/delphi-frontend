import { DepositToSavingsPool } from 'model/types';

import type { FormData } from './AllocateForm';
import { destringifyName } from './utils';

export function getDeposits({ _, ...data }: FormData): DepositToSavingsPool[] {
  return Object.keys(data).reduce((acc, key) => {
    const poolAddress = destringifyName(key);
    const amount = data[key];

    return amount.isZero() ? acc : [...acc, { amount, poolAddress }];
  }, [] as DepositToSavingsPool[]);
}
