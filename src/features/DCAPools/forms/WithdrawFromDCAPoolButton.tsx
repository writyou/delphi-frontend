import React from 'react';

import { ModalButton, ButtonProps } from 'components';
import { SavingsPool } from 'model/types';

import { WithdrawFromDCAPoolForm } from './WithdrawFromDCAPoolForm';

export function WithdrawFromDCAPoolButton({
  pool,
  ...rest
}: { pool: SavingsPool } & ButtonProps): JSX.Element {
  return (
    <ModalButton {...rest} content="Withdraw">
      {({ closeModal }) => (
        <WithdrawFromDCAPoolForm
          poolAddress={pool.address}
          supportedTokens={pool.tokens}
          onSuccessfulWithdraw={closeModal}
        />
      )}
    </ModalButton>
  );
}
