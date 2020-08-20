import React, { useCallback } from 'react';
import { LiquidityAmount } from '@akropolis-web/primitives';

import { ConfirmationDialog, Button, ButtonProps } from 'components';
import { useApi } from 'services/api';

export function WithdrawRewardsButton({
  totalNav, // TODO load inside button
  ...rest
}: { totalNav: LiquidityAmount } & ButtonProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  const api = useApi();

  const handleWithdraw = useCallback(async (): Promise<void> => {
    await api.user.withdrawRewards();
    close();
  }, [api, totalNav]);

  return (
    <>
      <Button {...rest} onClick={open} disabled={totalNav.isZero()}>
        Withdraw
      </Button>
      <ConfirmationDialog
        isOpen={isOpen}
        yesText="Withdraw"
        title="Withdraw"
        onCancel={close}
        onConfirm={handleWithdraw}
      >
        Are you sure you want to withdraw {totalNav.toFormattedString()}
      </ConfirmationDialog>
    </>
  );
}
