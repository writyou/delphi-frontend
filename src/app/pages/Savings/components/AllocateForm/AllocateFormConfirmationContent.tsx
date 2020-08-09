import React, { useMemo } from 'react';
import * as R from 'ramda';
import { of } from 'rxjs';
import Typography from '@material-ui/core/Typography';
import { switchMap } from 'rxjs/operators';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { InfiniteApproveSwitch } from 'features/infiniteApprove';
import { ETH_NETWORK_CONFIG } from 'env';
import { useSubscribable } from 'utils/react';
import { Grid, Loading } from 'components';

import { getDeposits } from './getDeposits';
import { FeesTable } from './FeesTable';
import type { FormData } from './AllocateForm';

export function AllocateFormConfirmationContent(values: FormData) {
  const { t } = useTranslate();
  const spender = ETH_NETWORK_CONFIG.contracts.savingsModule;
  const api = useApi();
  const deposits = useMemo(() => getDeposits(values), [values]);

  const [fees, feesMeta] = useSubscribable(
    () =>
      api.web3Manager.account$.pipe(
        switchMap(account =>
          account
            ? api.erc20.hasMultipleInfiniteApprove(
                deposits.map(d => d.amount.currency.address),
                account,
                spender,
              )
            : of(null),
        ),
        switchMap(hasA => {
          if (!hasA) {
            return of(null);
          }
          return api.user.getSavingsDepositFees$(deposits);
        }),
      ),
    [api, deposits, spender],
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography>{t(tKeys.modules.savings.allocateDialog.getKey())}</Typography>
      </Grid>
      <Grid item xs={12} container>
        <Loading meta={feesMeta}>
          {fees ? (
            <FeesTable fees={fees} />
          ) : (
            t(tKeys.modules.savings.allocateNoApprovesWarning.getKey())
          )}
        </Loading>
      </Grid>
      <Grid item xs={12} container justify="flex-end">
        <InfiniteApproveSwitch
          spender={spender}
          tokens={R.uniqBy(
            token => token.address.toLowerCase(),
            deposits.map(x => x.amount.currency),
          )}
        />
      </Grid>
    </Grid>
  );
}
