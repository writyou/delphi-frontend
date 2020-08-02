import React from 'react';

import { ModalButton, ButtonProps } from 'components';
import { SavingsPool } from 'model/types';

import { WithdrawFromSavingsPoolForm } from './WithdrawFromSavingsPoolForm';

export function WithdrawFromSavingsPoolButton({
  pool,
  ...rest
}: { pool: SavingsPool } & ButtonProps): JSX.Element {
  return (
    <ModalButton {...rest} content="Withdraw">
      {({ closeModal }) => (
        <WithdrawFromSavingsPoolForm
          poolAddress={pool.address}
          supportedTokens={pool.tokens}
          onSuccessfulWithdraw={closeModal}
        />
      )}
    </ModalButton>
  );
}
