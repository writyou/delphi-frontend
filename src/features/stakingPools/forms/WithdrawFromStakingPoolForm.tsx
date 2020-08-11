import React, { useCallback, useMemo, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty } from 'rxjs';
import { map } from 'rxjs/operators';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { TokenAmount, Token } from 'model/entities';
import { useValidateAmount } from 'utils/react';
import { denormolizeAmount } from 'utils/amounts';

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

export function WithdrawFromStakingPoolForm({
  poolAddress,
  supportedTokens,
  onSuccessfulWithdraw,
}: WithdrawFormProps) {
  const api = useApi();
  const { t } = useTranslate();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const maxValue$ = useMemo(
    () =>
      currentToken
        ? api.user
            .getFullStakingPoolBalance$(poolAddress)
            .pipe(map(balance => denormolizeAmount(balance, currentToken)))
        : empty(),
    [api, currentToken],
  );

  const validateAmount = useValidateAmount({
    required: true,
    moreThenZero: true,
    maxValue: maxValue$,
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

      await api.staking.withdraw({ amount, poolAddress });

      onSuccessfulWithdraw && onSuccessfulWithdraw();
    },
    [api, poolAddress],
  );

  const DialogContent = () => {
    return <>{t(tKeys.modules.staking.withdrawDialog.getKey())}</>;
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
          name={fieldNames.amount}
          currencies={supportedTokens}
          placeholder="Enter sum"
          validate={validateAmount}
          maxValue={maxValue$}
        />
        <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
        <SpyField name="__" fieldValue={validateAmount} />
      </>
    </FormWithConfirmation>
  );
}
