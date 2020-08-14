import React, { useCallback } from 'react';
import { FieldValidator } from 'final-form';
import { FormSpy } from 'react-final-form';
import { TokenAmount, Token } from '@akropolis-web/primitives';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { Grid } from 'components';
import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { useValidateAmount, useSubscribable } from 'utils/react';
import { lessThenOrEqual } from 'utils/validators';

interface FormData {
  depositAmount: TokenAmount | null | '';
  weeklyAmount: TokenAmount | null | '';
}

interface WithdrawFormProps {
  tokenToSell: Token;
  poolAddress: string;
  onSuccessfulWithdraw?(): void;
}

const fieldNames: FieldNames<FormData> = {
  depositAmount: 'depositAmount',
  weeklyAmount: 'weeklyAmount',
};

const initialValues: FormData = {
  depositAmount: null,
  weeklyAmount: null,
};

export function DepositDCAPoolForm({
  poolAddress,
  tokenToSell,
  onSuccessfulWithdraw,
}: WithdrawFormProps) {
  const api = useApi();
  const { t } = useTranslate();

  const [maxValue] = useSubscribable(() => api.user.getTokenBalance$(tokenToSell.address), [api]);

  const validateAmount = useValidateAmount({
    required: true,
    moreThenZero: true,
    maxValue,
    maxErrorTKey: tKeys.utils.validation.insufficientFunds.getKey(),
  });

  const validateWeeklyAmount = (value: FormData['weeklyAmount'], allValues: FormData) => {
    const { depositAmount } = allValues;
    if (depositAmount && value) {
      return lessThenOrEqual(depositAmount.toBN(), value.toBN(), () =>
        depositAmount.toFormattedString(),
      );
    }
    return undefined;
  };

  const handleFormSubmit = useCallback(
    async ({ depositAmount, weeklyAmount }: FormData) => {
      if (!depositAmount || !weeklyAmount) return;

      await api.dca.deposit({ depositAmount, poolAddress, weeklyAmount });

      onSuccessfulWithdraw && onSuccessfulWithdraw();
    },
    [api, poolAddress],
  );

  const DialogContent = ({ depositAmount }: FormData) => {
    return (
      <>
        {t(tKeys.modules.dca.depositDialog.getKey())}{' '}
        {depositAmount ? depositAmount.toFormattedString() : '⏳'}
      </>
    );
  };

  return (
    <FormWithConfirmation<FormData>
      title="Dollar Cost Average"
      initialValues={initialValues}
      DialogContent={DialogContent}
      onSubmit={handleFormSubmit}
      submitButton="Deposit"
    >
      <>
        <Grid container spacing={3} justify="space-between" alignItems="center">
          <Grid item xs={4}>
            Full Deposit Amount
          </Grid>
          <Grid item xs={8}>
            <TokenAmountField
              name={fieldNames.depositAmount}
              currencies={[tokenToSell]}
              placeholder="Enter sum"
              validate={validateAmount}
              maxValue={maxValue}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} justify="space-between" alignItems="center">
          <Grid item xs={4}>
            Weekly DCA Amount
          </Grid>
          <Grid item xs={8}>
            <FormSpy<FormData> subscription={{ values: true }}>
              {({ values: { depositAmount } }) => (
                <TokenAmountField
                  name={fieldNames.weeklyAmount}
                  currencies={[tokenToSell]}
                  maxValue={depositAmount || undefined}
                  validate={validateWeeklyAmount as FieldValidator<FormData['weeklyAmount']>}
                  hideCurrencySelect
                />
              )}
            </FormSpy>
          </Grid>
        </Grid>
        <SpyField name="__" fieldValue={validateAmount} />
      </>
    </FormWithConfirmation>
  );
}
