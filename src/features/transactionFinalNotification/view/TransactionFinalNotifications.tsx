import React, { useState, useCallback } from 'react';
import { of, from } from 'rxjs';

import { useSubscribable } from 'utils/react';
import { useApi, SubmittedTransaction } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { ConfirmationDialog } from 'components';
import { getTransactionLinkFromHash } from 'utils/helpers';
import { routes } from 'app/routes';

import {
  DepositDialogTemplate,
  DepositDialogProps,
  ErrorDialogTemplate,
  WithdrawDialogTemplate,
  WithdrawDialogProps,
} from './DialogTemplates';

const mapVariantToButtonTKey: Record<Variant, string> = {
  withdraw: tKeys.features.transactionFinalNotification.withdraw.button.getKey(),
  deposit: tKeys.features.transactionFinalNotification.deposit.button.getKey(),
  withdrawError: tKeys.features.transactionFinalNotification.withdrawError.button.getKey(),
  depositError: tKeys.features.transactionFinalNotification.depositError.button.getKey(),
};

type Variant = 'withdraw' | 'deposit' | 'withdrawError' | 'depositError';

const withdrawCases: SubmittedTransaction['type'][] = [
  'savings.withdraw',
  'staking.withdraw',
  'rewards.withdraw',
];
const depositCases: SubmittedTransaction['type'][] = ['savings.deposit', 'staking.deposit'];

export function TransactionFinalNotifications() {
  const api = useApi();
  const { t } = useTranslate();
  const transaction = useSubscribable<SubmittedTransaction>(
    () => api.transactions.getSubmittedTransaction$(),
    [api],
  ).toUndefined();

  const transactionsQueue = Array(0);

  const hash = useSubscribable(() => (transaction ? from(transaction.tx) : of(undefined)), [
    transaction,
  ]).toUndefined();

  const [isOpen, setOpen] = useState(false);
  const [variant, setVariant] = useState<Variant>('deposit');

  const handleConfirm = useCallback(async () => {
    setOpen(false);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
    transactionsQueue.shift();
  }, []);

  const listenTransactionAction = useCallback(async st => {
    if (st && (withdrawCases.includes(st.type) || depositCases.includes(st.type))) {
      const isWithdraw = withdrawCases.includes(st.type);
      try {
        await st.promiEvent;
        setVariant(isWithdraw ? 'withdraw' : 'deposit');
      } catch {
        setVariant(isWithdraw ? 'withdrawError' : 'depositError');
      } finally {
        transactionsQueue.push(st);
        setOpen(true);
      }
    }
  }, []);

  React.useEffect(() => {
    transaction && listenTransactionAction(transaction);
  }, [transaction]);

  return (
    transactionsQueue[0] && (
      <ConfirmationDialog
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleClose}
        yesText={t(mapVariantToButtonTKey[variant])}
      >
        {renderDialogTemplate(getPayload(transactionsQueue[0]))}
      </ConfirmationDialog>
    )
  );

  function getPayload(
    transactionPl?: SubmittedTransaction,
  ): DepositDialogProps | WithdrawDialogProps | null {
    if (transactionPl && hash) {
      switch (transactionPl.type) {
        case 'savings.deposit':
          return {
            amounts: transactionPl.payload.deposits.map(d => d.amount),
            poolAddresses: transactionPl.payload.deposits.map(d => d.poolAddress),
            depositLink: routes.pools.savings.getRedirectPath(),
            onClose: handleClose,
          };
        case 'staking.deposit':
          return {
            amounts: [transactionPl.payload.deposit.amount],
            poolAddresses: [transactionPl.payload.deposit.poolAddress],
            isStakingDeposit: true,
            depositLink: routes.pools.staking.getRedirectPath(),
            onClose: handleClose,
          };
        case 'savings.withdraw':
          return {
            amounts: [transactionPl.payload.withdraw.amount],
            wallet: transactionPl.payload.fromAddress,
            withdrawLink: getTransactionLinkFromHash(hash),
          };
        case 'staking.withdraw':
          return {
            amounts: [transactionPl.payload.withdraw.amount],
            wallet: transactionPl.payload.fromAddress,
            withdrawLink: getTransactionLinkFromHash(hash),
          };
        case 'rewards.withdraw':
          return {
            amounts: transactionPl.payload.amounts,
            wallet: transactionPl.payload.fromAddress,
            withdrawLink: getTransactionLinkFromHash(hash),
          };
      }
    }
    return null;
  }

  function renderDialogTemplate(payload: DepositDialogProps | WithdrawDialogProps | null) {
    if (payload === null && (variant === 'withdrawError' || variant === 'depositError'))
      return <ErrorDialogTemplate variant={variant} />;
    if (payload && 'poolAddresses' in payload) return <DepositDialogTemplate {...payload} />;
    if (payload && 'wallet' in payload) return <WithdrawDialogTemplate {...payload} />;
    return null;
  }
}
