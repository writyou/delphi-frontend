import { empty, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { useApi } from 'services/api';
import { tKeys } from 'services/i18n';
import { Token } from 'model/entities';
import { useSubscribable } from 'utils/react';
import { min } from 'utils/bn';
import { denormolizeAmount } from 'utils/amounts';

import { useGetDepositLimit$ } from './useGetDepositLimit$';

export function useDepositAmountValidationParams(poolAddress: string, token: Token | null) {
  const api = useApi();

  const getDepositLimit$ = useGetDepositLimit$(poolAddress);

  const [validationParams] = useSubscribable(
    () =>
      token
        ? combineLatest([api.user.getTokenBalance$(token.address), getDepositLimit$()]).pipe(
            map(([balance, limit]) => {
              const denormalizedLimit = limit && denormolizeAmount(limit, balance.currency);
              const maxValue = denormalizedLimit ? min(balance, denormalizedLimit) : balance;
              return {
                maxValue,
                maxErrorTKey: maxValue.eq(balance)
                  ? tKeys.utils.validation.insufficientFunds.getKey()
                  : tKeys.utils.validation.depositLimitExceeded.getKey(),
              };
            }),
          )
        : empty(),
    [api, token, getDepositLimit$],
  );

  const maxValue = validationParams?.maxValue;
  const maxErrorTKey = validationParams?.maxErrorTKey;

  return { maxValue, maxErrorTKey };
}
