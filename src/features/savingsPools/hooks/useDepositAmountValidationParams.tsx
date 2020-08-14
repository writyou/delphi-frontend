import { empty, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  min,
  max,
  Token,
  TokenAmount,
  denormolizeAmount,
  isEqualHex,
} from '@akropolis-web/primitives';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { DepositToSavingsPool } from 'model/types';

export function useDepositAmountValidationParams(
  poolAddress: string,
  token: Token | null,
  formValues?: DepositToSavingsPool[],
) {
  const { t } = useTranslate();
  const api = useApi();

  const [validationParams] = useSubscribable(
    () =>
      token
        ? combineLatest([
            api.user.getTokenBalance$(token.address),
            api.user.getSavingsDepositLimit$(poolAddress),
          ]).pipe(
            map(([balance, limit]) => {
              const otherAmounts = formValues
                ? formValues.reduce((acc, v) => {
                    return isEqualHex(v.poolAddress, poolAddress) ||
                      !isEqualHex(v.amount.currency.address, token.address)
                      ? acc
                      : [...acc, v.amount];
                  }, [] as TokenAmount[])
                : [];
              const sum = otherAmounts.reduce((acc, v) => {
                return acc.add(v);
              }, new TokenAmount(0, token));
              const calculatedBalance = max(new TokenAmount(0, token), balance.sub(sum));
              const denormalizedLimit = limit && denormolizeAmount(limit, balance.currency);
              const maxValue = denormalizedLimit
                ? min(calculatedBalance, denormalizedLimit)
                : calculatedBalance;

              return {
                maxValue,
                maxErrorTKey: maxValue.eq(calculatedBalance)
                  ? t(tKeys.utils.validation.insufficientFunds.getKey(), {
                      value: balance.toFormattedString(),
                    })
                  : tKeys.utils.validation.depositLimitExceeded.getKey(),
              };
            }),
          )
        : empty(),
    [api, token, poolAddress, formValues],
  );

  const maxValue = validationParams?.maxValue;
  const maxErrorTKey = validationParams?.maxErrorTKey;

  return { maxValue, maxErrorTKey };
}
