import React, { useState, useCallback } from 'react';
import { of, from } from 'rxjs';

import { useSubscribable } from 'utils/react';
import { useApi, SubmittedTransaction } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { ConfirmationDialog } from 'components';
import { getTransactionLinkFromHash } from 'utils/helpers';
import { routes } from 'app/routes';

import { DialogContentTemplate, Variant, Payload } from './DialogContentTemplate';

const mapVariantToButtonTKey: Record<Variant, string> = {
  withdraw: tKeys.features.transactionFinalNotification.withdraw.button.getKey(),
  deposit: tKeys.features.transactionFinalNotification.deposit.button.getKey(),
  errorWithdraw: tKeys.features.transactionFinalNotification.withdrawError.button.getKey(),
  errorDeposit: tKeys.features.transactionFinalNotification.depositError.button.getKey(),
};

const withdrawCases: SubmittedTransaction['type'][] = [
  'savings.withdraw',
  'staking.withdraw',
  'rewards.withdraw',
];
const depositCases: SubmittedTransaction['type'][] = ['savings.deposit', 'staking.deposit'];

function getPayload(transaction?: SubmittedTransaction): Payload {
  if (transaction) {
    switch (transaction.type) {
      case 'savings.deposit':
        return {
          amounts: transaction.payload.deposits.map(d => d.amount),
          poolAddresses: transaction.payload.deposits.map(d => d.poolAddress),
          depositLink: routes.pools.savings.getRedirectPath(),
        };
      case 'savings.withdraw':
        return {
          amounts: [transaction.payload.withdraw.amount],
          poolAddresses: [],
          wallet: transaction.payload.fromAddress,
        };
      case 'staking.deposit':
        return {
          amounts: [transaction.payload.deposit.amount],
          poolAddresses: [transaction.payload.deposit.poolAddress],
          isStakingDeposit: true,
          depositLink: routes.pools.staking.getRedirectPath(),
        };
      case 'staking.withdraw':
        return {
          amounts: [transaction.payload.withdraw.amount],
          poolAddresses: [],
          wallet: transaction.payload.fromAddress,
        };
      case 'rewards.withdraw':
        return {
          amounts: transaction.payload.amounts,
          poolAddresses: [],
          wallet: transaction.payload.fromAddress,
        };
    }
  }
  return {};
}

export function TransactionFinalNotification() {
  const api = useApi();
  const { t } = useTranslate();
  const transactionRD = useSubscribable<SubmittedTransaction>(
    () => api.transactions.getSubmittedTransaction$(),
    [api],
  );
  const transaction = transactionRD.toUndefined();

  const hashRD = useSubscribable(() => (transaction ? from(transaction.tx) : of(undefined)), [
    transactionRD,
  ]);

  const hash = hashRD.toUndefined();

  const [isOpen, setOpen] = useState(false);
  const [variant, setVariant] = useState<Variant>('deposit');

  const handleConfirm = useCallback(async () => {
    setOpen(false);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const myEffect = useCallback(
    async st => {
      if (
        transaction &&
        (withdrawCases.includes(transaction.type) || depositCases.includes(transaction.type))
      ) {
        const isWithdraw = withdrawCases.includes(transaction.type);
        try {
          await st.promiEvent;

          setVariant(isWithdraw ? 'withdraw' : 'deposit');
          setOpen(true);
        } catch {
          setVariant(isWithdraw ? 'errorWithdraw' : 'errorDeposit');
          setOpen(true);
        }
      }
    },
    [transaction],
  );

  React.useEffect(() => {
    transaction && myEffect(transaction);
  }, [transaction]);

  const withdrawLink =
    withdrawCases.includes(transaction?.type as any) && hash
      ? getTransactionLinkFromHash(hash)
      : undefined;

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onConfirm={handleConfirm}
      onCancel={handleClose}
      yesText={t(mapVariantToButtonTKey[variant])}
    >
      <DialogContentTemplate
        {...getPayload(transaction)}
        variant={variant}
        withdrawLink={withdrawLink}
        onClose={handleClose}
      />
    </ConfirmationDialog>
  );
}
