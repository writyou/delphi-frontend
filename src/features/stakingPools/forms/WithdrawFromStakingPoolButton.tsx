import React, { useCallback } from 'react';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { StakingPool } from 'model/types';
import { ConfirmationDialog, Loading, Button, ButtonProps } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi, Api } from 'services/api';

export function WithdrawFromStakingPoolButton({
  pool,
  ...rest
}: { pool: StakingPool } & ButtonProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  const api = useApi();
  const confirmationParamsRD = useSubscribable(() => getConfirmationParams$(api, pool.address), [
    api,
    pool.address,
  ]);

  const handleUnstake = useCallback(async (): Promise<void> => {
    const params = confirmationParamsRD.toUndefined();
    if (params) {
      await api.staking.withdraw({
        poolAddress: pool.address,
        amount: params.unlockedBalance,
      });
      close();
    }
  }, [api, pool.address, confirmationParamsRD]);

  return (
    <Loading data={confirmationParamsRD}>
      {params =>
        params.unlockedBalance.isZero() ? null : (
          <>
            <Button {...rest} onClick={open}>
              Unstake
            </Button>
            <ConfirmationDialog
              isOpen={isOpen}
              yesText="Unstake"
              title="Unstake"
              onCancel={close}
              onConfirm={handleUnstake}
              withCancelButton
            >
              Are you sure you want to unstake {params.unlockedBalance.toFormattedString()}
            </ConfirmationDialog>
          </>
        )
      }
    </Loading>
  );
}

function getConfirmationParams$(api: Api, poolAddress: string) {
  return combineLatest([
    api.user.getFullStakingPoolBalance$(poolAddress),
    api.user.getUnlockedStakingPoolBalance$(poolAddress),
  ]).pipe(map(([fullBalance, unlockedBalance]) => ({ fullBalance, unlockedBalance })));
}
