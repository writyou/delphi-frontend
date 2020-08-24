import React, { useCallback, useMemo } from 'react';
import { combineLatest, of } from 'rxjs';
import BN from 'bn.js';
import { catchError, map } from 'rxjs/operators';
import { TokenAmount, Token, decimalsToWei } from '@akropolis-web/primitives';

import { useApi } from 'services/api';
import { FormWithConfirmation, TokenAmountField, FieldNames } from 'components/form';
import { useSubscribableDeprecated } from 'utils/react';
import { ETH_NETWORK_CONFIG } from 'env';
import { DeprecatedLoading } from 'components';
import { ALL_TOKEN } from 'utils/mock';

interface FormData {
  amount: TokenAmount | null;
}

interface WithdrawFormProps {
  onSuccessfulWithdraw?(): void;
}

const fieldNames: FieldNames<FormData> = {
  amount: 'amount',
};

export function MintTestnetTokenForm({ onSuccessfulWithdraw }: WithdrawFormProps) {
  const api = useApi();

  const [tokens, tokensMeta] = useSubscribableDeprecated(
    () =>
      combineLatest(
        Object.values(ETH_NETWORK_CONFIG.tokens).map(tokenAddress => {
          try {
            return api.erc20.getToken$(tokenAddress).pipe(catchError(() => of(null)));
          } catch {
            return of(null);
          }
        }),
      ).pipe(map(values => values.filter((value): value is Token => !!value))),
    [api],
  );

  const initialValues: FormData = useMemo(
    () => ({
      amount: new TokenAmount(new BN(100).mul(decimalsToWei(ALL_TOKEN.decimals)), ALL_TOKEN),
    }),
    [],
  );

  const handleFormSubmit = useCallback(
    async ({ amount }: FormData) => {
      if (!amount) return;

      await api.erc20.mintTestTokens(amount);

      onSuccessfulWithdraw && onSuccessfulWithdraw();
    },
    [api],
  );

  const getDialogContent = () => {
    return <>Are you sure you want to mint test tokens?</>;
  };

  return (
    <FormWithConfirmation<FormData>
      title="Mint test tokens"
      initialValues={initialValues}
      DialogContent={getDialogContent}
      onSubmit={handleFormSubmit}
    >
      <>
        <DeprecatedLoading meta={tokensMeta}>
          {tokens && (
            <TokenAmountField
              inputProps={{ disabled: process.env.NODE_ENV !== 'development' }}
              name={fieldNames.amount}
              currencies={tokens}
            />
          )}
        </DeprecatedLoading>
      </>
    </FormWithConfirmation>
  );
}
