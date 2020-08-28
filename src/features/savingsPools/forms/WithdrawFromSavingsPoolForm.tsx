import React, { useCallback, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenAmount, Token, denormolizeAmount, AllCoinsToken } from '@akropolis-web/primitives';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { Typography } from 'components';
import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { useValidateAmount, useSubscribable } from 'utils/react';

import { WithdrawAdditionalFee } from '../data/WithdrawAdditionalFee';
import { WithdrawSupposedAmountsTable } from '../data/WithdrawSupposedAmountsTable';
import { AlertHint } from '../view/AlertHint';

interface FormData {
  amount: TokenAmount | null;
}

interface WithdrawFormProps {
  supportedTokens: Token[];
  poolAddress: string;
  onSuccessfulWithdraw?(): void;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
};

const initialValues: FormData = {
  amount: null,
};

export function WithdrawFromSavingsPoolForm({
  poolAddress,
  supportedTokens,
  onSuccessfulWithdraw,
}: WithdrawFormProps) {
  const api = useApi();
  const { t } = useTranslate();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const maxValueRD = useSubscribable(
    () =>
      currentToken
        ? api.user
            .getSavingsPoolBalance$(poolAddress)
            .pipe(map(balance => denormolizeAmount(balance, currentToken)))
        : empty(),
    [api, currentToken],
  );

  // TODO need to research api
  const maxValue = maxValueRD.fold(
    () => undefined,
    () => undefined,
    () => undefined,
    value => value,
  );

  const validateAmount = useValidateAmount({
    maxValue,
    required: true,
    moreThanZero: true,
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

      await (amount.currency instanceof AllCoinsToken
        ? api.savings.withdrawAll({ amount, poolAddress })
        : api.savings.withdraw({ amount, poolAddress }));

      onSuccessfulWithdraw && onSuccessfulWithdraw();
    },
    [api, poolAddress],
  );

  const DialogContent = () => {
    return <>{t(tKeys.modules.savings.withdrawDialog.getKey())}</>;
  };

  return (
    <FormWithConfirmation<FormData>
      title="Withdraw"
      initialValues={initialValues}
      DialogContent={DialogContent}
      onSubmit={handleFormSubmit}
    >
      <>
        <TokenAmountField
          allowSelectAllToken
          name={fieldNames.amount}
          currencies={supportedTokens}
          placeholder="Enter sum"
          validate={validateAmount}
          maxValue={maxValue}
        />
        <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
        <SpyField name="__" fieldValue={validateAmount} />
      </>
      <FormSpy<FormData> subscription={{ values: true, valid: true }}>
        {({ values: { amount }, valid }) =>
          amount?.currency instanceof AllCoinsToken ? (
            <>
              {valid && amount && (
                <WithdrawSupposedAmountsTable poolAddress={poolAddress} amount={amount} />
              )}
              <AlertHint />
            </>
          ) : (
            valid &&
            amount && (
              <Typography>
                Additional fee is{' '}
                <WithdrawAdditionalFee poolAddress={poolAddress} amount={amount} />
              </Typography>
            )
          )
        }
      </FormSpy>
    </FormWithConfirmation>
  );
}
