import React, { useMemo } from 'react';
import { FormSpy } from 'react-final-form';
import * as R from 'ramda';
import { of } from 'rxjs';
import Typography from '@material-ui/core/Typography';
import { switchMap } from 'rxjs/operators';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation } from 'components/form';
import { DepositToSavingsPool, SavingsPool } from 'model/types';
import { TokenAmount } from 'model/entities';
import { InfiniteApproveSwitch } from 'features/infiniteApprove';
import { ETH_NETWORK_CONFIG } from 'env';
import { useSubscribable } from 'utils/react';
import { Grid } from 'components';

import { AllocateFormTemplate } from './AllocateFormTemplate';
import { SavingsPoolField } from './SavingsPoolField/SavingsPoolField';

type AllocateFormProps = {
  pools: SavingsPool[];
};

export type FormData = Record<string, TokenAmount> & { _: () => void };

// https://github.com/final-form/react-final-form/blob/master/docs/faq.md#why-cant-i-have-numeric-keys-in-an-object
export const stringifyName = (value: string) => `key${value}`;
export const destringifyName = (value: string) => value.substring(3);

export function AllocateForm({ pools }: AllocateFormProps) {
  const { t } = useTranslate();
  const api = useApi();

  const handleFormSubmit = (data: FormData) => {
    const filteredData = getDeposits(data);
    return filteredData.length ? api.savings.deposit(filteredData) : undefined;
  };

  return (
    <FormWithConfirmation<FormData>
      DialogContent={DialogContent}
      onSubmit={handleFormSubmit}
      submitButton={t(tKeys.modules.savings.allocate.getKey())}
      CustomFormTemplate={props => (
        <AllocateFormTemplate {...props} infiniteUnlock={renderInfiniteUnlockSwitcher()} />
      )}
    >
      {pools.map(pool => (
        <SavingsPoolField key={pool.address} pool={pool} name={stringifyName(pool.address)} />
      ))}
    </FormWithConfirmation>
  );

  function renderInfiniteUnlockSwitcher(): React.ReactNode {
    return (
      <FormSpy<FormData> subscription={{ values: true }}>
        {({ values }) => (
          <InfiniteApproveSwitch
            spender={ETH_NETWORK_CONFIG.contracts.savingsModule}
            tokens={R.uniqBy(
              token => token.address.toLowerCase(),
              getDeposits(values).map(x => x.amount.currency),
            )}
          />
        )}
      </FormSpy>
    );
  }
}

function DialogContent(values: FormData) {
  const { t } = useTranslate();
  const spender = ETH_NETWORK_CONFIG.contracts.savingsModule;
  const api = useApi();
  const [account] = useSubscribable(() => api.web3Manager.account$, [api]);
  const deposits = useMemo(() => getDeposits(values), [values]);

  const [fees] = useSubscribable(
    account
      ? () =>
          api.erc20
            .hasMultipleInfiniteApprove(
              deposits.map(d => d.amount.currency.address),
              account,
              spender,
            )
            .pipe(
              switchMap(hasA => {
                if (!hasA) {
                  return of(false);
                }
                return api.user.getUserDepositFees$(deposits);
              }),
            )
      : () => of(false),
    [api, deposits, account, spender],
  );

  type Fees = Array<DepositToSavingsPool & { fee: TokenAmount }>;
  // todo check fees table

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography>{t(tKeys.modules.savings.allocateDialog.getKey())}</Typography>
      </Grid>
      <Grid item xs={12} container>
        {fees
          ? (fees as Fees).map(fee => (
              <>
                <Grid item xs={4}>
                  {fee.poolAddress}
                </Grid>
                <Grid item xs={4}>
                  {fee.amount.currency.symbol}
                </Grid>
                <Grid item xs={4}>
                  {fee.fee}
                </Grid>
              </>
            ))
          : t(tKeys.modules.savings.allocateNoApprovesWarning.getKey())}
      </Grid>
      <Grid item xs={12}>
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

function getDeposits({ _, ...data }: FormData): DepositToSavingsPool[] {
  return Object.keys(data).reduce((acc, key) => {
    const poolAddress = destringifyName(key);
    const amount = data[key];

    return amount.isZero() ? acc : [...acc, { amount, poolAddress }];
  }, [] as DepositToSavingsPool[]);
}
