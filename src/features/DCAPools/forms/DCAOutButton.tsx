import React from 'react';

import { ModalButton, ButtonProps } from 'components';
import { DCAPool } from 'model/types';

// TODO add form into modal
export function DCAOutButton({ pool, ...rest }: { pool: DCAPool } & ButtonProps): JSX.Element {
  return (
    <ModalButton {...rest} content="DCA Out">
      {() => null}
    </ModalButton>
  );
}
