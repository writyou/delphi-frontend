import React, { useCallback } from 'react';

import { ConfirmationDialog, Button, ButtonProps, Loading } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

export function WithdrawRewardsButton(props: ButtonProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  const api = useApi();

  const handleWithdraw = useCallback(async (): Promise<void> => {
    await api.user.withdrawRewards();
    close();
  }, [api]);
  const [totalBalance, meta] = useSubscribable(() => api.user.getTotalRewardsBalance$(), [api]);

  return (
    <Loading meta={meta}>
      <Button {...props} onClick={open} disabled={!totalBalance || totalBalance.isZero()}>
        Withdraw
      </Button>
      <ConfirmationDialog
        isOpen={isOpen}
        yesText="Withdraw"
        title="Withdraw"
        onCancel={close}
        onConfirm={handleWithdraw}
      >
        Are you sure you want to withdraw {totalBalance && totalBalance.toFormattedString()}
      </ConfirmationDialog>
    </Loading>
  );
}
