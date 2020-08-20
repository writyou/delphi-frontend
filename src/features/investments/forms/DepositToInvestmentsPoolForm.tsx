import React, { useCallback, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { TokenAmount, Token } from '@akropolis-web/primitives';

import { getSignificantValue } from 'utils';
import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { useValidateAmount, useSubscribable } from 'utils/react';
import { SavingsPool } from 'model/types';
import { Grid, Loading, FormattedAmount, Typography } from 'components';
import { InfiniteApproveSwitch } from 'features/infiniteApprove';
import { ETH_NETWORK_CONFIG } from 'env';

import { useDepositAmountValidationParams } from '../hooks/useDepositAmountValidationParams';
import { AllocateFormTemplate } from './AllocateFormTemplate';

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

export function DepositToInvestmentsPoolForm({ pool, onSuccessfulDeposit }: DepositFormProps) {
  const api = useApi();
  const { t } = useTranslate();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const { maxErrorTKey, maxValue } = useDepositAmountValidationParams(pool.address, currentToken);

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

      await api.investments.deposit([{ amount, poolAddress: pool.address }]);

      onSuccessfulDeposit && onSuccessfulDeposit();
    },
    [api, pool.address],
  );

  const DepositToInvestmentsConfirmContent = ({ amount }: FormData) => {
    const spender = ETH_NETWORK_CONFIG.contracts.savingsModule;

    const [fees, feesMeta] = useSubscribable(
      () =>
        currentToken
          ? api.web3Manager.account$.pipe(
              switchMap(account => {
                if (!account) {
                  return of(null);
                }
                return api.erc20
                  .hasInfiniteApprove(currentToken.address, account, spender)
                  .pipe(map(hasApprove => (hasApprove ? account : null)));
              }),
              switchMap(account => {
                return account && amount
                  ? api.investments.getDepositFees$(account, [
                      { poolAddress: pool.address, amount },
                    ])
                  : of(null);
              }),
            )
          : empty(),
      [api, pool, spender],
    );

    const fee = fees && fees[0]?.fee;

    return (
      <>
        {`${t(tKeys.modules.savings.allocateToOnePoolDialog.getKey(), {
          amount: amount ? amount.toFormattedString() : '⏳',
        })}`}
        <Loading meta={feesMeta}>
          <Typography>
            Additional fee is{' '}
            {fee && fee.gt(getSignificantValue(fee.currency.decimals)) ? (
              <FormattedAmount sum={fee} variant="plain" />
            ) : (
              'zero'
            )}
          </Typography>
        </Loading>
      </>
    );
  };

  return (
    <FormWithConfirmation<FormData>
      title="Allocate"
      DialogContent={DepositToInvestmentsConfirmContent}
      onSubmit={handleFormSubmit}
      submitButton="Allocate"
      CustomFormTemplate={AllocateFormTemplate}
    >
      <>
        <Grid item xs>
          <TokenAmountField
            name={fieldNames.amount}
            currencies={pool.tokens}
            placeholder="Enter sum"
            validate={validateAmount}
            maxValue={maxValue}
          />
        </Grid>
        {currentToken && (
          // TODO: can't set center align cause row height changing
          <Grid item style={{ paddingTop: 7 }}>
            <InfiniteApproveSwitch
              tokens={currentToken}
              spender={ETH_NETWORK_CONFIG.contracts.savingsModule}
            />
          </Grid>
        )}

        <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
        <SpyField name="__" fieldValue={validateAmount} />
      </>
    </FormWithConfirmation>
  );
}
