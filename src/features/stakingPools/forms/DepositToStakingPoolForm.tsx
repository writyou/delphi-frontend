import React, { useCallback, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenAmount, Token, min } from '@akropolis-web/primitives';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { useValidateAmount, useSubscribable } from 'utils/react';
import { StakingPool } from 'model/types';
import { Grid } from 'components';
import { InfiniteApproveSwitch } from 'features/infiniteApprove';
import { ETH_NETWORK_CONFIG } from 'env';

import { DepositToStakingFormTemplate } from './DepositToStakingFormTemplate';

interface FormData {
  amount: TokenAmount | null;
}

interface DepositFormProps {
  pool: StakingPool;
  onSuccessfulDeposit?(): void;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
};

export function DepositToStakingPoolForm({ pool, onSuccessfulDeposit }: DepositFormProps) {
  const api = useApi();
  const { t } = useTranslate();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const validationParamsRD = useSubscribable(
    () =>
      currentToken
        ? combineLatest([
            api.user.getTokenBalance$(currentToken.address),
            api.user.getStakingDepositLimit$(pool.address),
          ]).pipe(
            map(([balance, limit]) => {
              const maxValue = limit ? min(balance, limit) : balance;
              return {
                maxValue,
                maxErrorTKey: maxValue.eq(balance)
                  ? tKeys.utils.validation.insufficientFunds.getKey()
                  : tKeys.utils.validation.depositLimitExceeded.getKey(),
              };
            }),
          )
        : empty(),
    [api, currentToken, pool.address],
  );

  // TODO need to research api
  const { maxValue, maxErrorTKey } =
    validationParamsRD.fold(
      () => undefined,
      () => undefined,
      () => undefined,
      params => params,
    ) || {};

  const validateAmount = useValidateAmount({
    required: true,
    moreThanZero: true,
    maxValue,
    maxErrorTKey,
  });

  const handleFormChange = useCallback(
    ({ values: { amount } }: FormState<FormData>) => {
      if (!currentToken || !amount || !currentToken.equals(amount.currency)) {
        setCurrentToken(amount?.currency || null);
      }
    },
    [currentToken],
  );

  const handleFormSubmit = useCallback(
    async ({ amount }: FormData) => {
      if (!amount) return;

      await api.staking.deposit({ amount, poolAddress: pool.address });

      onSuccessfulDeposit && onSuccessfulDeposit();
    },
    [api, pool.address],
  );

  const DialogContent = ({ amount }: FormData) => {
    return (
      <>
        {`${t(tKeys.modules.staking.allocateToOnePoolDialog.getKey(), {
          amount: amount ? amount.toFormattedString() : '⏳',
        })}`}
      </>
    );
  };

  return (
    <FormWithConfirmation<FormData>
      title="Stake"
      DialogContent={DialogContent}
      onSubmit={handleFormSubmit}
      submitButton="Stake"
      CustomFormTemplate={DepositToStakingFormTemplate}
    >
      <>
        <TokenAmountField
          name={fieldNames.amount}
          currencies={[pool.token]}
          placeholder="Enter sum"
          validate={validateAmount}
          maxValue={maxValue}
        />
        <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
        <SpyField name="__" fieldValue={validateAmount} />
      </>
      {currentToken && (
        <Grid container justify="flex-end">
          <Grid item>
            <InfiniteApproveSwitch
              tokens={currentToken}
              spender={ETH_NETWORK_CONFIG.contracts.akroStakingPool}
            />
          </Grid>
        </Grid>
      )}
    </FormWithConfirmation>
  );
}
