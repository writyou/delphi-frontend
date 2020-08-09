import React from 'react';

import { ModalButton, ButtonProps } from 'components';
import { StakingPool } from 'model/types';

import { WithdrawFromStakingPoolForm } from './WithdrawFromStakingPoolForm';

export function WithdrawFromStakingPoolButton({
  pool,
  ...rest
}: { pool: StakingPool } & ButtonProps): JSX.Element {
  return (
    <ModalButton {...rest} content="Unstake">
      {({ closeModal }) => (
        <WithdrawFromStakingPoolForm
          poolAddress={pool.address}
          supportedTokens={pool.tokens}
          onSuccessfulWithdraw={closeModal}
        />
      )}
    </ModalButton>
  );
}
