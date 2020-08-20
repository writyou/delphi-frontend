import React from 'react';

import { getSignificantValue } from 'utils';
import { ModalButton, ButtonProps, Loading, Button } from 'components';
import { SavingsPool } from 'model/types';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

/*
 TODO:
 * replace current interfaces with ones from package
 * remove old code

*/

import { WithdrawFromInvestmentsPoolForm } from './WithdrawFromInvestmentsPoolForm';

export function WithdrawFromInvestmentsPoolButton({
  pool,
  ...rest
}: { pool: SavingsPool } & ButtonProps): JSX.Element {
  const api = useApi();
  const [balance, balanceMeta] = useSubscribable(
    () => api.user.getInvestmentsPoolBalance$(pool.address),
    [api],
  );

  const disabled = !!balance && !balance.gt(getSignificantValue(balance.currency.decimals));

  return (
    <Loading
      meta={balanceMeta}
      loader={
        <Button {...rest} disabled>
          Withdraw
        </Button>
      }
    >
      <ModalButton {...rest} disabled={disabled} content="Withdraw">
        {({ closeModal }) => (
          <WithdrawFromInvestmentsPoolForm
            poolAddress={pool.address}
            supportedTokens={pool.tokens}
            onSuccessfulWithdraw={closeModal}
          />
        )}
      </ModalButton>
    </Loading>
  );
}
