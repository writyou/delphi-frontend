import React, { useCallback } from 'react';
import { TokenAmount, Token } from '@akropolis-web/primitives';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { useValidateAmount, useSubscribable } from 'utils/react';

interface FormData {
  amount: TokenAmount | null;
}

interface WithdrawFormProps {
  tokenToSell: Token;
  poolAddress: string;
  onSuccessfulWithdraw?(): void;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
};

const initialValues: FormData = {
  amount: null,
};

export function ChangeDCAPoolForm({
  poolAddress,
  tokenToSell,
  onSuccessfulWithdraw,
}: WithdrawFormProps) {
  const api = useApi();
  const { t } = useTranslate();

  const maxValueRD = useSubscribable(() => api.user.getDCATokenToSellBalance$(poolAddress), [api]);

  const maxValue = maxValueRD.toUndefined();

  const validateAmount = useValidateAmount({
    maxValue,
    required: true,
    moreThanZero: true,
  });

  const handleFormSubmit = useCallback(
    async ({ amount }: FormData) => {
      if (!amount) return;

      await api.dca.change({ weeklyAmount: amount, poolAddress });

      onSuccessfulWithdraw && onSuccessfulWithdraw();
    },
    [api, poolAddress],
  );

  const DialogContent = ({ amount }: FormData) => {
    return (
      <>
        {t(tKeys.modules.dca.changeDialog.getKey())} {amount?.toFormattedString() || '⏳'}
      </>
    );
  };

  return (
    <FormWithConfirmation<FormData>
      title="Change Current DCA Settings"
      initialValues={initialValues}
      DialogContent={DialogContent}
      onSubmit={handleFormSubmit}
    >
      <>
        <TokenAmountField
          allowSelectAllToken
          name={fieldNames.amount}
          currencies={[tokenToSell]}
          placeholder="Enter sum"
          validate={validateAmount}
          maxValue={maxValue}
        />
        <SpyField name="__" fieldValue={validateAmount} />
      </>
    </FormWithConfirmation>
  );
}
