import React from 'react';
import { TokenAmount } from '@akropolis-web/primitives';

import { FormattedAmount, DeprecatedLoading, Box } from 'components';
import { useSubscribableDeprecated } from 'utils/react';
import { useApi } from 'services/api';
import { getSignificantValue } from 'utils';

type Props = {
  amount: TokenAmount;
  poolAddress: string;
};

export function WithdrawAdditionalFee(props: Props) {
  const { amount, poolAddress } = props;
  const api = useApi();
  const [additionalFee, additionalFeeMeta] = useSubscribableDeprecated(
    () => api.user.getSavingsWithdrawFee$(poolAddress, amount),
    [api, poolAddress, amount],
  );

  return (
    <Box component="span" display="inline-block">
      <DeprecatedLoading meta={additionalFeeMeta} progressProps={{ width: 50 }}>
        {additionalFee &&
          (additionalFee.gt(getSignificantValue(additionalFee.currency.decimals)) ? (
            <FormattedAmount sum={additionalFee} variant="plain" />
          ) : (
            'zero'
          ))}
      </DeprecatedLoading>
    </Box>
  );
}
