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
import * as R from 'ramda';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { DepositToSavingsPool } from 'model/types';

export function useDepositAmountValidationParams(
  poolAddress: string,
  token: Token | null,
  deposits: DepositToSavingsPool[] = [],
) {
  const { t } = useTranslate();
  const api = useApi();

  const validationParamsRD = useSubscribable(
    () =>
      token
        ? combineLatest([
            api.user.getTokenBalance$(token.address),
            api.user.getAvailableForDeposit$(poolAddress),
          ]).pipe(
            map(([userBalance, availableForDepositInInterestingPool]) => {
              const totalAmountSetInOtherPools = deposits.reduce((acc, deposit) => {
                const isDifferentPool = !isEqualHex(deposit.poolAddress, poolAddress);
                const isInterestingToken = !isEqualHex(
                  deposit.amount.currency.address,
                  token.address,
                );
                return isDifferentPool && isInterestingToken ? acc.add(deposit.amount) : acc;
              }, new TokenAmount(0, token));

              const remainingUserBalance = max(
                new TokenAmount(0, token),
                userBalance.sub(totalAmountSetInOtherPools),
              );
              const limitOnDeposit =
                availableForDepositInInterestingPool &&
                denormolizeAmount(availableForDepositInInterestingPool, token);
              const maxAvailableForDeposit = limitOnDeposit
                ? min(remainingUserBalance, limitOnDeposit)
                : remainingUserBalance;

              return {
                maxValue: maxAvailableForDeposit,
                maxErrorTKey: maxAvailableForDeposit.eq(remainingUserBalance)
                  ? t(tKeys.utils.validation.insufficientFunds.getKey(), {
                      value: userBalance.toFormattedString(),
                    })
                  : tKeys.utils.validation.depositLimitExceeded.getKey(),
              };
            }),
          )
        : empty(),
    [api, token?.address, poolAddress, R.toString(deposits)],
  );

  const { maxValue, maxErrorTKey } = validationParamsRD.toUndefined() || {};

  return { maxValue, maxErrorTKey };
}
