import React from 'react';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModalButton, ButtonProps, Loading, Button } from 'components';
import { StakingPool } from 'model/types';
import { useApi } from 'services/api';
import { useSubscribableDeprecated } from 'utils/react';

import { DepositToStakingPoolForm } from './DepositToStakingPoolForm';

export function DepositToStakingPoolButton({
  pool,
  ...rest
}: { pool: StakingPool } & ButtonProps): JSX.Element {
  const api = useApi();

  const [isStakeDisabled, meta] = useSubscribableDeprecated(
    () =>
      combineLatest([
        api.user.getStakingDepositLimit$(pool.address),
        api.user.getFullStakingPoolBalance$(pool.address),
      ]).pipe(
        map(
          ([depositLimit, balance]) =>
            (!!depositLimit && !depositLimit.gt(0)) || !balance || balance.isZero(),
        ),
      ),
    [api, pool.address],
  );

  return (
    <Loading
      meta={meta}
      loader={
        <Button {...rest} disabled>
          Stake
        </Button>
      }
    >
      <ModalButton {...rest} disabled={isStakeDisabled} content="Stake">
        {({ closeModal }) => (
          <DepositToStakingPoolForm pool={pool} onSuccessfulDeposit={closeModal} />
        )}
      </ModalButton>
    </Loading>
  );
}
