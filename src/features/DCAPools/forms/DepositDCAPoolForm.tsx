import React, { useCallback, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty } from 'rxjs';
import { map } from 'rxjs/operators';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { Grid } from 'components';
import {
  FormWithConfirmation,
  TokenAmountField,
  FieldNames,
  SpyField,
  DecimalsField,
} from 'components/form';
import { TokenAmount, Token, Fraction } from 'model/entities';
import { useValidateAmount, useSubscribable } from 'utils/react';
import { denormolizeAmount } from 'utils/amounts';
import { lessThenOrEqual } from 'utils/validators';
import { fromBaseUnit } from 'utils/bn';

interface FormData {
  depositAmount: TokenAmount | null;
  weeklyAmount: any;
}

interface WithdrawFormProps {
  supportedTokens: Token[];
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
  supportedTokens,
  onSuccessfulWithdraw,
}: WithdrawFormProps) {
  const api = useApi();
  const { t } = useTranslate();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const [maxValue] = useSubscribable(
    () =>
      currentToken
        ? api.user
            .getDCAPoolBalance$(poolAddress)
            .pipe(map(balance => denormolizeAmount(balance, currentToken)))
        : empty(),
    [api, currentToken],
  );

  const validateAmount = useValidateAmount({
    required: true,
    moreThenZero: true,
    maxValue,
  });

  const val = (value: string, allValues: Object) => {
    const { depositAmount } = allValues as FormData;
    if (depositAmount) {
      const baseDecimals = depositAmount.currency.decimals;
      const val1 = new Fraction(value).toBN();
      const val2 = depositAmount.toBN();

      return lessThenOrEqual(val2, val1, () => fromBaseUnit(val2, baseDecimals));
    }
    return undefined;
  };

  const handleFormChange = useCallback(
    ({ values: { depositAmount } }: FormState<FormData>) => {
      if (!currentToken || !depositAmount || !currentToken.equals(depositAmount.currency)) {
        setCurrentToken(depositAmount?.currency || null);
      }
    },
    [currentToken],
  );

  const handleFormSubmit = useCallback(
    async ({ depositAmount, weeklyAmount }: FormData) => {
      if (!depositAmount) return;

      await api.dca.deposit({ depositAmount, poolAddress, weeklyAmount });

      onSuccessfulWithdraw && onSuccessfulWithdraw();
    },
    [api, poolAddress],
  );

  const getConfirmationMessage = useCallback(({ depositAmount }: FormData) => {
    return `${t(tKeys.modules.investments.dcaDepositDialog.getKey())} ${
      depositAmount ? depositAmount.toFormattedString() : '⏳'
    }`;
  }, []);

  return (
    <FormWithConfirmation<FormData>
      title="Dollar Cost Average"
      initialValues={initialValues}
      getConfirmationMessage={getConfirmationMessage}
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
              currencies={supportedTokens}
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
            <DecimalsField
              name={fieldNames.weeklyAmount}
              baseDecimals={currentToken?.decimals || 18}
              maxValue={maxValue?.toBN()}
              validate={val}
            />
          </Grid>
        </Grid>
        <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
        <SpyField name="__" fieldValue={validateAmount} />
      </>
    </FormWithConfirmation>
  );
}
