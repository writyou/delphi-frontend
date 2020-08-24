import React from 'react';
import { TokenAmount } from '@akropolis-web/primitives';

import { FormattedAmount, Loading, Box } from 'components';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { getSignificantValue } from 'utils';

type Props = {
  amount: TokenAmount;
  poolAddress: string;
};

export function WithdrawAdditionalFee(props: Props) {
  const { amount, poolAddress } = props;
  const api = useApi();
  const additionalFeeRD = useSubscribable(
    () => api.user.getSavingsWithdrawFee$(poolAddress, amount),
    [api, poolAddress, amount],
  );

  return (
    <Box component="span" display="inline-block">
      <Loading data={additionalFeeRD} progressProps={{ width: 50 }}>
        {additionalFee =>
          additionalFee.gt(getSignificantValue(additionalFee.currency.decimals)) ? (
            <FormattedAmount sum={additionalFee} variant="plain" />
          ) : (
            <>zero</>
          )
        }
      </Loading>
    </Box>
  );
}
