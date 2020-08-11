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
  const [params, paramsMeta] = useSubscribable(() => getConfirmationParams$(api, pool.address), [
    api,
    pool.address,
  ]);

  const handleUnstake = useCallback(async (): Promise<void> => {
    await api.staking.withdraw({ poolAddress: pool.address });
    close();
  }, [api, pool.address]);

  const unstakeDisabled: boolean = !params || params.unlockedBalance.isZero();

  return (
    <>
      <Loading
        meta={paramsMeta}
        loader={
          <Button {...rest} disabled>
            Unstake
          </Button>
        }
      >
        <Button {...rest} onClick={open} disabled={unstakeDisabled}>
          Unstake
        </Button>
      </Loading>
      <ConfirmationDialog
        isOpen={isOpen}
        yesText="Unstake"
        title="Unstake"
        onCancel={close}
        onConfirm={handleUnstake}
      >
        Are you sure you want to unstake {params?.unlockedBalance.toFormattedString()}
      </ConfirmationDialog>
    </>
  );
}

function getConfirmationParams$(api: Api, poolAddress: string) {
  return combineLatest([
    api.user.getFullStakingPoolBalance$(poolAddress),
    api.user.getUnlockedStakingPoolBalance$(poolAddress),
  ]).pipe(map(([fullBalance, unlockedBalance]) => ({ fullBalance, unlockedBalance })));
}