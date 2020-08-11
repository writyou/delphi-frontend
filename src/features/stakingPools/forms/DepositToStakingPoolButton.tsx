import React from 'react';

import { ModalButton, ButtonProps, Loading, Button } from 'components';
import { StakingPool } from 'model/types';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { DepositToStakingPoolForm } from './DepositToStakingPoolForm';

export function DepositToStakingPoolButton({
  pool,
  ...rest
}: { pool: StakingPool } & ButtonProps): JSX.Element {
  const api = useApi();

  const [depositLimit, depositLimitMeta] = useSubscribable(
    () => api.user.getStakingDepositLimit$(pool.address),
    [api, pool.address],
  );

  return (
    <Loading
      meta={depositLimitMeta}
      loader={
        <Button {...rest} disabled>
          Stake
        </Button>
      }
    >
      <ModalButton {...rest} disabled={!!depositLimit && !depositLimit.gt(0)} content="Stake">
        {({ closeModal }) => (
          <DepositToStakingPoolForm pool={pool} onSuccessfulDeposit={closeModal} />
        )}
      </ModalButton>
    </Loading>
  );
}
