import React from 'react';

import { ModalButton, ButtonProps } from 'components';
import { StakingPool } from 'model/types';

import { DepositToStakingPoolForm } from './DepositToStakingPoolForm';

export function DepositToStakingPoolButton({
  pool,
  ...rest
}: { pool: StakingPool } & ButtonProps): JSX.Element {
  return (
    <ModalButton {...rest} content="Stake">
      {({ closeModal }) => (
        <DepositToStakingPoolForm pool={pool} onSuccessfulDeposit={closeModal} />
      )}
    </ModalButton>
  );
}
