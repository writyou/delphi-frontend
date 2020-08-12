import React from 'react';

import { FormattedAmount, Loading, Box } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { TokenAmount } from 'model/entities';
import { getSignificantValue } from 'utils/bn';

type Props = {
  amount: TokenAmount;
  poolAddress: string;
};

export function WithdrawAdditionalFee(props: Props) {
  const { amount, poolAddress } = props;
  const api = useApi();
  const [additionalFee, additionalFeeMeta] = useSubscribable(
    () => api.user.getSavingsWithdrawFee$(poolAddress, amount),
    [api, poolAddress, amount],
  );

  return (
    <Box component="span" display="inline-block">
      <Loading meta={additionalFeeMeta} progressProps={{ width: 50 }}>
        {additionalFee &&
          (additionalFee.gt(getSignificantValue(additionalFee.currency.decimals)) ? (
            <FormattedAmount sum={additionalFee} variant="plain" />
          ) : (
            'zero'
          ))}
      </Loading>
    </Box>
  );
}
