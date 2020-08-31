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
import { Grid, Loading, FormattedAmount } from 'components';
import { getSignificantValue } from 'utils';
import { makeStyles } from 'utils/styles';

import { getDeposits } from './getDeposits';
import { DepositsTable } from './DepositsTable';
import type { FormData } from './AllocateForm';

export function AllocateFormConfirmationContent(values: FormData) {
  const { t } = useTranslate();
  const classes = useStyles();
  const spender = ETH_NETWORK_CONFIG.contracts.savingsModule;
  const api = useApi();
  const deposits = useMemo(() => getDeposits(values), [values]);

  const feeRD = useSubscribable(
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
          return api.user.getSavingsTotalDepositFee$(deposits);
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
        <DepositsTable deposits={deposits} />
      </Grid>
      <Grid item xs={12} container>
        <Loading data={feeRD}>
          {fee =>
            fee ? (
              <Grid className={classes.feeRow} container justify="space-between">
                <Grid item xs={6}>
                  Fee
                </Grid>
                <Grid item alignContent="flex-end">
                  {fee.gt(getSignificantValue(fee.currency.decimals)) ? (
                    <FormattedAmount sum={fee} variant="plain" />
                  ) : (
                    '—'
                  )}
                </Grid>
              </Grid>
            ) : (
              <>{t(tKeys.modules.savings.allocateNoApprovesWarning.getKey())}</>
            )
          }
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

const useStyles = makeStyles(() => ({
  feeRow: {
    borderBottom: '1px solid #20202D',
    paddingBottom: 20,
  },
}));
