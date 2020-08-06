import React from 'react';

import { FormattedAmount, Loading } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { TokenAmount } from 'model/entities';

type Props = {
  amount: TokenAmount;
  poolAddress: string;
};

export function WithdrawAdditionalFee(props: Props) {
  const { amount, poolAddress } = props;
  const api = useApi();
  const [additionalFee, additionalFeeMeta] = useSubscribable(
    () => api.savings.getWithdrawFee$(poolAddress, amount),
    [api, poolAddress, amount],
  );

  return (
    <Loading meta={additionalFeeMeta}>
      {additionalFee && <FormattedAmount sum={additionalFee} variant="plain" />}
    </Loading>
  );
}
