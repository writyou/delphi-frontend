import React, { useState, useCallback } from 'react';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { useSubscribable } from 'utils/react';
import { useApi, SubmittedTransaction } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { ConfirmationDialog } from 'components';
import { getTransactionLinkFromHash } from 'utils/helpers';
import { routes } from 'app/routes';

import {
  DepositDialogContent,
  DepositDialogProps,
  ErrorDialogContent,
  ErrorDialogProps,
  WithdrawDialogContent,
  WithdrawDialogProps,
} from './DialogVariants';

const mapVariantToButtonTKey: Record<Variant, string> = {
  withdraw: tKeys.features.transactionFinalNotification.withdraw.button.getKey(),
  deposit: tKeys.features.transactionFinalNotification.deposit.button.getKey(),
  withdrawError: tKeys.features.transactionFinalNotification.withdrawError.button.getKey(),
  depositError: tKeys.features.transactionFinalNotification.depositError.button.getKey(),
};

type Variant = 'withdraw' | 'deposit' | 'withdrawError' | 'depositError';

type TransactionResult =
  | (DepositDialogProps & { variant: 'deposit' })
  | (WithdrawDialogProps & { variant: 'withdraw' })
  | ErrorDialogProps
  | null;

const withdrawCases: SubmittedTransaction['type'][] = [
  'savings.withdraw',
  'staking.withdraw',
  'rewards.withdraw',
];
const depositCases: SubmittedTransaction['type'][] = ['savings.deposit', 'staking.deposit'];

export function TransactionFinalNotifications() {
  const api = useApi();
  const { t } = useTranslate();

  const { transaction, hash } =
    useSubscribable(
      () =>
        api.transactions
          .getSubmittedTransaction$()
          .pipe(switchMap(st => from(st.tx).pipe(map(hs => ({ transaction: st, hash: hs }))))),
      [api],
    ).toUndefined() || {};

  const [variant, setVariant] = useState<Variant>('deposit');
  const [transactionsResultsQueue, setTransactionsResultsQueue] = useState<TransactionResult[]>([]);

  const handleConfirm = useCallback(async () => {
    setTransactionsResultsQueue([...transactionsResultsQueue?.slice(1)]);
  }, [transactionsResultsQueue]);
  const handleClose = useCallback(() => {
    setTransactionsResultsQueue([...transactionsResultsQueue?.slice(1)]);
  }, [transactionsResultsQueue]);

  const listenTransactionAction = useCallback(
    async (st: SubmittedTransaction) => {
      if (st && (withdrawCases.includes(st.type) || depositCases.includes(st.type))) {
        const isWithdraw = withdrawCases.includes(st.type);
        try {
          await st.promiEvent;
          setVariant(isWithdraw ? 'withdraw' : 'deposit');
        } catch {
          setVariant(isWithdraw ? 'withdrawError' : 'depositError');
        } finally {
          setTransactionsResultsQueue([...transactionsResultsQueue, getDialogData(st)]);
        }
      }
    },
    [transactionsResultsQueue],
  );

  React.useEffect(() => {
    transaction && listenTransactionAction(transaction);
  }, [transaction]);

  return (
    <ConfirmationDialog
      isOpen={Boolean(transactionsResultsQueue[0])}
      onConfirm={handleConfirm}
      onCancel={handleClose}
      yesText={t(mapVariantToButtonTKey[variant])}
    >
      {renderDialogContent(transactionsResultsQueue[0])}
    </ConfirmationDialog>
  );

  function getDialogData(st?: SubmittedTransaction): TransactionResult {
    switch (variant) {
      case 'withdrawError':
      case 'depositError':
        return { variant };
    }
    if (st) {
      switch (st.type) {
        case 'savings.deposit':
          return {
            variant: 'deposit',
            amounts: st.payload.deposits.map(d => d.amount),
            poolAddresses: st.payload.deposits.map(d => d.poolAddress),
            depositLink: routes.pools.savings.getRedirectPath(),
            onClose: handleClose,
          };
        case 'staking.deposit':
          return {
            variant: 'deposit',
            amounts: [st.payload.deposit.amount],
            poolAddresses: [st.payload.deposit.poolAddress],
            isStakingDeposit: true,
            depositLink: routes.pools.staking.getRedirectPath(),
            onClose: handleClose,
          };
        case 'savings.withdraw':
        case 'staking.withdraw':
          return {
            variant: 'withdraw',
            amounts: [st.payload.withdraw.amount],
            wallet: st.payload.fromAddress,
            withdrawLink: hash && getTransactionLinkFromHash(hash),
          };
        case 'rewards.withdraw':
          return {
            variant: 'withdraw',
            amounts: st.payload.amounts,
            wallet: st.payload.fromAddress,
            withdrawLink: hash && getTransactionLinkFromHash(hash),
          };
      }
    }
    return null;
  }

  function renderDialogContent(payload: TransactionResult) {
    if (payload) {
      switch (payload.variant) {
        case 'deposit':
          return <DepositDialogContent {...payload} />;
        case 'withdraw':
          return <WithdrawDialogContent {...payload} />;
        case 'withdrawError':
        case 'depositError':
          return <ErrorDialogContent variant={payload.variant} />;
      }
    }
    return null;
  }
}
