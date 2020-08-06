import React from 'react';

import { ModalButton, ButtonProps } from 'components';
import { DCAPool } from 'model/types';

import { WithdrawFromDCAPoolForm } from './WithdrawFromDCAPoolForm';

export function WithdrawFromDCAPoolButton({
  pool,
  ...rest
}: { pool: DCAPool } & ButtonProps): JSX.Element {
  return (
    <ModalButton {...rest} content="Withdraw">
      {({ closeModal }) => (
        <WithdrawFromDCAPoolForm
          poolAddress={pool.address}
          tokenToSell={pool.tokenToSell}
          supportedTokens={pool.tokens}
          onSuccessfulWithdraw={closeModal}
        />
      )}
    </ModalButton>
  );
}
