import React from 'react';

import { ModalButton, ButtonProps } from 'components';
import { SavingsPool } from 'model/types';

import { ChangeDCAPoolForm } from './ChangeDCAPoolForm';

export function ChangeDCAPoolButton({
  pool,
  ...rest
}: { pool: SavingsPool } & ButtonProps): JSX.Element {
  return (
    <ModalButton {...rest} content="Change">
      {({ closeModal }) => (
        <ChangeDCAPoolForm
          poolAddress={pool.address}
          supportedTokens={pool.tokens}
          onSuccessfulWithdraw={closeModal}
        />
      )}
    </ModalButton>
  );
}
