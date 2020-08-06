import React from 'react';

import { ModalButton, ButtonProps } from 'components';
import { DCAPool } from 'model/types';

import { ChangeDCAPoolForm } from './ChangeDCAPoolForm';

export function ChangeDCAPoolButton({
  pool,
  ...rest
}: { pool: DCAPool } & ButtonProps): JSX.Element {
  return (
    <ModalButton {...rest} content="Change">
      {({ closeModal }) => (
        <ChangeDCAPoolForm
          poolAddress={pool.address}
          supportedTokens={[pool.tokenToSell]}
          onSuccessfulWithdraw={closeModal}
        />
      )}
    </ModalButton>
  );
}
