import React, { useCallback, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty } from 'rxjs';
import { TokenAmount, Token } from '@akropolis-web/primitives';

import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { useApi } from 'services/api';
import { useValidateAmount, useSubscribable } from 'utils/react';

interface FormData {
  amount: TokenAmount | null;
}

interface DepositToPoolFormProps {
  supportedTokens: Token[];
  poolAddress: string;
  onCancel?(): void;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
};

const initialValues: FormData = {
  amount: null,
};

export function DepositToPoolForm({
  onCancel,
  poolAddress,
  supportedTokens,
}: DepositToPoolFormProps) {
  const api = useApi();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const maxValueRD = useSubscribable(
    () => (currentToken ? api.user.getTokenBalance$(currentToken.address) : empty()),
    [api, currentToken],
  );

  const maxValue = maxValueRD.toUndefined();

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
    ({ amount }: FormData) => {
      return amount ? api.savings.deposit([{ amount, poolAddress }]) : undefined;
    },
    [api],
  );

  const DialogContent = ({ amount }: FormData) => {
    return <>{`Are you sure you want deposit ${amount ? amount.toFormattedString() : '⏳'}`}</>;
  };

  return (
    <FormWithConfirmation<FormData>
      title="Deposit"
      initialValues={initialValues}
      DialogContent={DialogContent}
      onSubmit={handleFormSubmit}
      onCancel={onCancel}
    >
      <>
        <TokenAmountField
          name={fieldNames.amount}
          currencies={supportedTokens}
          placeholder="Enter sum"
          validate={validateAmount}
          maxValue={maxValue}
        />

        <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
        <SpyField name="__" fieldValue={validateAmount} />
      </>
    </FormWithConfirmation>
  );
}
