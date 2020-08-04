import React from 'react';

import { ModalButton, ButtonProps } from 'components';
import { SavingsPool } from 'model/types';

import { DepositDCAPoolForm } from './DepositDCAPoolForm';

export function DepositDCAPoolButton({
  pool,
  ...rest
}: { pool: SavingsPool } & ButtonProps): JSX.Element {
  return (
    <ModalButton {...rest} content="DCA">
      {({ closeModal }) => (
        <DepositDCAPoolForm
          poolAddress={pool.address}
          supportedTokens={pool.tokens}
          onSuccessfulWithdraw={closeModal}
        />
      )}
    </ModalButton>
  );
}
