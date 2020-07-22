import React, { useCallback } from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi } from 'services/api';
import { ConfirmationDialog, Button, ButtonProps } from 'components';

type IProps = ButtonProps & {
  proposalId: string;
  borrower: string;
};

const tKeysConfirmation = tKeysAll.features.cashExchange.exchangingConfirmation;
const tKeys = tKeysAll.features.cashExchange.cancelProposalButton;

function CancelProposalButton(props: IProps) {
  const { borrower, proposalId, ...restProps } = props;
  const { t } = useTranslate();
  const api = useApi();

  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  const handleActivate = useCallback(async (): Promise<void> => {
    await api.loanModule.cancelDebtProposal(borrower, proposalId);
    close();
  }, [borrower, proposalId]);

  return (
    <>
      <Button {...restProps} onClick={open} />
      <ConfirmationDialog
        isOpen={isOpen}
        message={t(tKeys.confirmMessage.getKey())}
        noText={t(tKeysConfirmation.no.getKey())}
        yesText={t(tKeysConfirmation.yes.getKey())}
        title={t(tKeysConfirmation.title.getKey())}
        onCancel={close}
        onConfirm={handleActivate}
      />
    </>
  );
}

export { CancelProposalButton };
