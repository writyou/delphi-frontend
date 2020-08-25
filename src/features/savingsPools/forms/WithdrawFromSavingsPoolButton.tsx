import React from 'react';

import { getSignificantValue } from 'utils';
import { ModalButton, ButtonProps, Loading, Button } from 'components';
import { SavingsPool } from 'model/types';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

import { WithdrawFromSavingsPoolForm } from './WithdrawFromSavingsPoolForm';

export function WithdrawFromSavingsPoolButton({
  pool,
  ...rest
}: { pool: SavingsPool } & ButtonProps): JSX.Element {
  const api = useApi();
  const balanceRD = useSubscribable(() => api.user.getSavingsPoolBalance$(pool.address), [api]);

  return (
    <Loading
      data={balanceRD}
      loader={
        <Button {...rest} disabled>
          Withdraw
        </Button>
      }
    >
      {balance => {
        const modalDisabled = balance.lt(getSignificantValue(balance.currency.decimals));

        return (
          <ModalButton {...rest} disabled={modalDisabled} content="Withdraw">
            {({ closeModal }) => (
              <WithdrawFromSavingsPoolForm
                poolAddress={pool.address}
                supportedTokens={pool.tokens}
                onSuccessfulWithdraw={closeModal}
              />
            )}
          </ModalButton>
        );
      }}
    </Loading>
  );
}
