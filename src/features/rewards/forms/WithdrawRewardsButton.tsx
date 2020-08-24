import React, { useCallback } from 'react';

import { ConfirmationDialog, Button, ButtonProps, DeprecatedLoading } from 'components';
import { useApi } from 'services/api';
import { useSubscribableDeprecated } from 'utils/react';

export function WithdrawRewardsButton(props: ButtonProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  const api = useApi();

  const handleWithdraw = useCallback(async (): Promise<void> => {
    await api.user.withdrawRewards();
    close();
  }, [api]);
  const [totalBalance, meta] = useSubscribableDeprecated(() => api.user.getTotalRewardsBalance$(), [
    api,
  ]);

  return (
    <>
      <DeprecatedLoading
        meta={meta}
        loader={
          <Button {...props} disabled>
            Withdraw
          </Button>
        }
      >
        <Button {...props} onClick={open} disabled={!totalBalance || totalBalance.isZero()}>
          Withdraw
        </Button>
      </DeprecatedLoading>
      <ConfirmationDialog
        isOpen={isOpen}
        yesText="Withdraw"
        title="Withdraw"
        onCancel={close}
        onConfirm={handleWithdraw}
      >
        Are you sure you want to withdraw {totalBalance?.toFormattedString()}
      </ConfirmationDialog>
    </>
  );
}
