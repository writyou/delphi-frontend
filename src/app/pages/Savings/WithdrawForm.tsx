import React, { useCallback, useMemo, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty } from 'rxjs';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { TokenAmount, Token } from 'model/entities';
import { useValidateAmount } from 'utils/react';

interface FormData {
  amount: TokenAmount | null;
}

interface DepositToPoolFormProps {
  supportedTokens: Token[];
  poolAddress: string;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
};

const initialValues: FormData = {
  amount: null,
};

export function WithdrawForm({ poolAddress, supportedTokens }: DepositToPoolFormProps) {
  const api = useApi();
  const { t } = useTranslate();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const maxValue$ = useMemo(
    () => (currentToken ? api.user.getTokenBalance$(currentToken.address) : empty()), // mocked
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
    ({ amount }: FormData) => {
      return amount ? api.savings.deposit([{ amount, poolAddress }]) : undefined; // mocked
    },
    [api],
  );

  const getConfirmationMessage = useCallback(({ amount }: FormData) => {
    return `${t(tKeys.modules.savings.withdrawDialog.getKey())} ${
      amount ? amount.toFormattedString() : '⏳'
    }`;
  }, []);

  return (
    <FormWithConfirmation<FormData>
      title="Withdraw"
      initialValues={initialValues}
      getConfirmationMessage={getConfirmationMessage}
      onSubmit={handleFormSubmit}
    >
      <>
        <TokenAmountField
          allowSelectAllCoin
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
