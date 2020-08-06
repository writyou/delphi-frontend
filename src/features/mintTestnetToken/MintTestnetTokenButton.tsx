import React from 'react';

import { ModalButton, ButtonProps } from 'components';

import { MintTestnetTokenForm } from './MintTestnetTokenForm';

export function MintTestnetTokenButton(props: ButtonProps): JSX.Element {
  return (
    <ModalButton {...props} content="Mint test tokens">
      {({ closeModal }) => <MintTestnetTokenForm onSuccessfulWithdraw={closeModal} />}
    </ModalButton>
  );
}
