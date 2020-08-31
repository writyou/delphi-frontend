import React, { useCallback } from 'react';

import { ConfirmationDialog, Button, ButtonProps, Loading } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { combine } from 'utils/remoteData';

export function WithdrawRewardsButton(props: ButtonProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  const api = useApi();
  const rewardsRD = useSubscribable(() => api.user.getRewards$(), [api]);

  const totalBalanceRD = useSubscribable(() => api.user.getTotalRewardsBalance$(), [api]);
  const combinedRD = combine(totalBalanceRD, rewardsRD);

  const handleWithdraw = useCallback(async (): Promise<void> => {
    const rewards = rewardsRD.toUndefined();
    if (rewards) {
      await api.rewards.withdrawUserRewards(rewards);
      close();
    }
  }, [api, rewardsRD]);

  return (
    <>
      <Loading
        data={combinedRD}
        loader={
          <Button {...props} disabled>
            Withdraw
          </Button>
        }
      >
        {([totalBalance]) => (
          <>
            <Button {...props} onClick={open} disabled={totalBalance.isZero()}>
              Withdraw
            </Button>
            <ConfirmationDialog
              isOpen={isOpen}
              yesText="Withdraw"
              title="Withdraw"
              onCancel={close}
              onConfirm={handleWithdraw}
              withCancelButton
            >
              Are you sure you want to withdraw {totalBalance.toFormattedString()}
            </ConfirmationDialog>
          </>
        )}
      </Loading>
    </>
  );
}
