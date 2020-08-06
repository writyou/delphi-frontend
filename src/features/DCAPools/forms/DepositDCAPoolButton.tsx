import React from 'react';

import { ModalButton, ButtonProps } from 'components';
import { DCAPool } from 'model/types';

import { DepositDCAPoolForm } from './DepositDCAPoolForm';

export function DepositDCAPoolButton({
  pool,
  ...rest
}: { pool: DCAPool } & ButtonProps): JSX.Element {
  return (
    <ModalButton {...rest} content="DCA">
      {({ closeModal }) => (
        <DepositDCAPoolForm
          poolAddress={pool.address}
          tokenToSell={pool.tokenToSell}
          onSuccessfulWithdraw={closeModal}
        />
      )}
    </ModalButton>
  );
}
