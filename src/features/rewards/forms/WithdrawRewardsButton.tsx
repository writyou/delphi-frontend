import React, { useCallback } from 'react';

import { ConfirmationDialog, Button, ButtonProps, Loading } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

export function WithdrawRewardsButton(props: ButtonProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  const api = useApi();
  const rewardsRD = useSubscribable(() => api.user.getRewards$(), [api]);
  // TODO need to research api
  const rewards = rewardsRD.fold(
    () => undefined,
    () => undefined,
    () => undefined,
    h => h,
  );

  const handleWithdraw = useCallback(async (): Promise<void> => {
    // TODO await rewardsRD
    if (rewards) {
      await api.rewards.withdrawUserRewards(rewards);
    } else {
      console.warn('no loaded rewards');
    }
    close();
  }, [api, rewards]);

  const totalBalanceRD = useSubscribable(() => api.user.getTotalRewardsBalance$(), [api]);

  return (
    <>
      <Loading
        data={totalBalanceRD}
        loader={
          <Button {...props} disabled>
            Withdraw
          </Button>
        }
      >
        {totalBalance => (
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
