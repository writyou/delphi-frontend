import React, { useCallback, useMemo, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty } from 'rxjs';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { TokenAmount, Token } from 'model/entities';
import { useValidateAmount } from 'utils/react';
import { SavingsPool } from 'model/types';
import { Grid } from 'components';
import { InfiniteApproveSwitch } from 'features/infiniteApprove';
import { ETH_NETWORK_CONFIG } from 'env';

interface FormData {
  amount: TokenAmount | null;
}

interface DepositFormProps {
  pool: SavingsPool;
  onSuccessfulDeposit?(): void;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
};

export function DepositToSavingsPoolForm({ pool, onSuccessfulDeposit }: DepositFormProps) {
  const api = useApi();
  const { t } = useTranslate();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const maxValue$ = useMemo(
    () => (currentToken ? api.user.getTokenBalance$(currentToken.address) : empty()),
    [api, currentToken],
  );

  const validateAmount = useValidateAmount({
    required: true,
    moreThenZero: true,
    maxValue: maxValue$,
    maxErrorTKey: tKeys.utils.validation.insufficientFunds.getKey(),
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

      await api.savings.deposit([{ amount, poolAddress: pool.address }]);

      onSuccessfulDeposit && onSuccessfulDeposit();
    },
    [api, pool.address],
  );

  const getConfirmationMessage = useCallback(({ amount }: FormData) => {
    return `${t(tKeys.modules.savings.allocateToOnePoolDialog.getKey(), {
      amount: amount ? amount.toFormattedString() : '⏳',
    })}`;
  }, []);

  return (
    <FormWithConfirmation<FormData>
      title="Allocate"
      getConfirmationMessage={getConfirmationMessage}
      onSubmit={handleFormSubmit}
      submitButton="Allocate"
    >
      <>
        <Grid container spacing={10} alignItems="center">
          <Grid item xs>
            <TokenAmountField
              name={fieldNames.amount}
              currencies={pool.tokens}
              placeholder="Enter sum"
              validate={validateAmount}
              maxValue={maxValue$}
            />
          </Grid>
          {currentToken && (
            <Grid item>
              <InfiniteApproveSwitch
                tokens={currentToken}
                spender={ETH_NETWORK_CONFIG.contracts.savingsModule}
              />
            </Grid>
          )}
        </Grid>
        <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
        <SpyField name="__" fieldValue={validateAmount} />
      </>
    </FormWithConfirmation>
  );
}
