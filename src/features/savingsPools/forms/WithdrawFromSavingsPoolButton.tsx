import React from 'react';

import { getSignificantValue } from 'utils';
import { ModalButton, ButtonProps, DeprecatedLoading, Button } from 'components';
import { SavingsPool } from 'model/types';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';

/*
 TODO:
 * replace current interfaces with ones from package
 * remove old code

*/

import { WithdrawFromSavingsPoolForm } from './WithdrawFromSavingsPoolForm';

export function WithdrawFromSavingsPoolButton({
  pool,
  ...rest
}: { pool: SavingsPool } & ButtonProps): JSX.Element {
  const api = useApi();
  const [balance, balanceMeta] = useSubscribableDeprecated(
    () => api.user.getSavingsPoolBalance$(pool.address),
    [api],
  );

  const disabled = !!balance && !balance.gt(getSignificantValue(balance.currency.decimals));

  return (
    <DeprecatedLoading
      meta={balanceMeta}
      loader={
        <Button {...rest} disabled>
          Withdraw
        </Button>
      }
    >
      <ModalButton {...rest} disabled={disabled} content="Withdraw">
        {({ closeModal }) => (
          <WithdrawFromSavingsPoolForm
            poolAddress={pool.address}
            supportedTokens={pool.tokens}
            onSuccessfulWithdraw={closeModal}
          />
        )}
      </ModalButton>
    </DeprecatedLoading>
  );
}
