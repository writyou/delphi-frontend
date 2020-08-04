import React from 'react';
import { useSnackbar } from 'notistack';

import { useSubscribable } from 'utils/react';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useApi, SubmittedTransaction } from 'services/api';
import { DEFAULT_LIQUIDITY_CURRENCY } from 'utils/mock';
import { LiquidityAmount } from 'model/entities';

const tKeys = tKeysAll.features.notifications;

function TransactionsNotifications() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const api = useApi();
  const [transaction] = useSubscribable<SubmittedTransaction>(
    () => api.transactions.getSubmittedTransaction$(),
    [],
  );

  const showNotifications = React.useCallback(
    async (submittedTransaction: SubmittedTransaction) => {
      const pendingNotificationKey = enqueueSnackbar(
        <NotificationText transaction={submittedTransaction} type="pending" />,
        {
          persist: true,
          variant: 'info',
        },
      );

      try {
        await submittedTransaction.promiEvent;
        enqueueSnackbar(<NotificationText transaction={submittedTransaction} type="success" />, {
          variant: 'success',
        });
      } catch {
        enqueueSnackbar(<NotificationText transaction={submittedTransaction} type="error" />, {
          persist: true,
          variant: 'error',
        });
      } finally {
        pendingNotificationKey && closeSnackbar(pendingNotificationKey);
      }
    },
    [enqueueSnackbar, closeSnackbar],
  );

  React.useEffect(() => {
    transaction && showNotifications(transaction);
  }, [transaction]);

  return <></>;
}

interface NotificationProps {
  type: 'success' | 'pending' | 'error';
  transaction: SubmittedTransaction;
}

function NotificationText({ transaction, type: notType }: NotificationProps) {
  const { t } = useTranslate();

  return <>{t(tKeys[transaction.type][notType].getKey(), getTranslateParams(transaction))}</>;
}

function getTranslateParams(transaction: SubmittedTransaction): Record<string, string> {
  switch (transaction.type) {
    case 'testnetERC20.mint':
    case 'erc20.approve':
      return {
        amount: transaction.payload.value.toFormattedString(),
      };
    case 'savings.withdraw':
      return {
        amount: transaction.payload.withdraw.amount.toFormattedString(),
      };
    case 'savings.withdrawAll':
      return {
        amount: new LiquidityAmount(
          transaction.payload.withdraw.amount,
          DEFAULT_LIQUIDITY_CURRENCY,
        ).toFormattedString(),
      };
    default:
      return {};
  }
}

export { TransactionsNotifications };
