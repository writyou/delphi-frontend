import React, { useCallback } from 'react';

import { ConfirmationDialog, Button, ButtonProps, Loading } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

export function WithdrawRewardsButton(props: ButtonProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  const api = useApi();
  const [totalBalance, balanceMeta] = useSubscribable(() => api.user.getTotalRewardsBalance$(), [
    api,
  ]);
  const [rewards, rewardsMeta] = useSubscribable(() => api.user.getRewards$(), [api]);

  const handleWithdraw = useCallback(async (): Promise<void> => {
    await api.rewards.withdrawUserRewards(rewards!);
    close();
  }, [api, rewards]);

  return (
    <>
      <Loading
        meta={[balanceMeta, rewardsMeta]}
        loader={
          <Button {...props} disabled>
            Withdraw
          </Button>
        }
      >
        <Button {...props} onClick={open} disabled={!totalBalance || totalBalance.isZero()}>
          Withdraw
        </Button>
      </Loading>
      <ConfirmationDialog
        isOpen={isOpen}
        yesText="Withdraw"
        title="Withdraw"
        onCancel={close}
        onConfirm={handleWithdraw}
        withCancelButton
      >
        Are you sure you want to withdraw {totalBalance?.toFormattedString()}
      </ConfirmationDialog>
    </>
  );
}
