import React, { useCallback, useMemo } from 'react';
import { combineLatest } from 'rxjs';
import BN from 'bn.js';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation, TokenAmountField, FieldNames } from 'components/form';
import { TokenAmount } from 'model/entities';
import { useSubscribable } from 'utils/react';
import { ETH_NETWORK_CONFIG } from 'env';
import { Loading } from 'components';
import { decimalsToWei } from 'utils/bn';
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
  const { t } = useTranslate();

  const [tokens, tokensMeta] = useSubscribable(
    () =>
      combineLatest(
        Object.values(ETH_NETWORK_CONFIG.tokens).map(tokenAddress =>
          api.erc20.getToken$(tokenAddress),
        ),
      ),
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
    return <>{t(tKeys.modules.savings.withdrawDialog.getKey())}</>;
  };

  return (
    <FormWithConfirmation<FormData>
      title="Mint test tokens"
      initialValues={initialValues}
      DialogContent={getDialogContent}
      onSubmit={handleFormSubmit}
    >
      <>
        <Loading meta={tokensMeta}>
          {tokens && (
            <TokenAmountField
              inputProps={{ disabled: true }}
              name={fieldNames.amount}
              currencies={tokens}
            />
          )}
        </Loading>
      </>
    </FormWithConfirmation>
  );
}
