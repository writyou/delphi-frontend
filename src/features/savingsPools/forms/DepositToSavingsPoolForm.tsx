import React, { useCallback, useMemo, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { FormState } from 'final-form';
import { empty, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation, TokenAmountField, FieldNames, SpyField } from 'components/form';
import { TokenAmount, Token } from 'model/entities';
import { useValidateAmount, useSubscribable } from 'utils/react';
import { SavingsPool } from 'model/types';
import { Grid, Loading, FormattedAmount } from 'components';
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

  const DepositToSavingsConfirmContent = ({ amount }: FormData) => {
    const spender = ETH_NETWORK_CONFIG.contracts.savingsModule;

    const [fees, feesMeta] = useSubscribable(
      () =>
        api.web3Manager.account$.pipe(
          switchMap(account => {
            if (!account) {
              return of(null);
            }
            return api.erc20.hasInfiniteApprove(pool.address, account, spender)
              ? account
              : of(null);
          }),
          switchMap(account => {
            return account && amount
              ? api.savings.getDepositFees$(account, [{ poolAddress: pool.address, amount }])
              : of(null);
          }),
        ),
      [api, pool, spender],
    );

    return (
      <>
        {`${t(tKeys.modules.savings.allocateToOnePoolDialog.getKey(), {
          amount: amount ? amount.toFormattedString() : '⏳',
        })}`}
        <Loading meta={feesMeta}>
          Additional fee{' '}
          {fees?.map(fee =>
            fee.fee?.isNeg() ? 'is zero' : <FormattedAmount sum={fee.fee} variant="plain" />,
          )}
        </Loading>
      </>
    );
  };

  return (
    <FormWithConfirmation<FormData>
      title="Allocate"
      DialogContent={DepositToSavingsConfirmContent}
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
