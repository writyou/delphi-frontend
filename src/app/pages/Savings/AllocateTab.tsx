import React from 'react';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { Loading, Grid } from 'components';
import { TokenAmount } from 'model/entities';
import { makeStyles } from 'utils/styles';
import { FormWithConfirmation } from 'components/form';
import { DepositToSavingsPool } from 'model/types';

import { CustomFormTemplate } from './CustomFormTemplate';
import { SavingsPoolField } from './SavingsPoolField/SavingsPoolField';

type FormData = Record<string, TokenAmount>;

export function AllocateTab() {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();
  const [pools, poolsMeta] = useSubscribable(() => api.savings.getPools$(), [api]);

  const handleFormSubmit = (data: FormData) => {
    const filteredData = Object.keys(data).reduce((acc, key) => {
      const poolAddress = key.substring(3);
      const amount = data[key];

      return amount.isZero() ? acc : [...acc, { amount, poolAddress }];
    }, [] as DepositToSavingsPool[]);
    return filteredData.length ? api.savings.deposit(filteredData) : undefined;
  };

  return (
    <>
      <div className={classes.allocateTabDescription}>
        {t(tKeys.modules.savings.allocateTabText.getKey())}
      </div>
      <Loading meta={poolsMeta}>
        {pools && (
          <FormWithConfirmation<FormData>
            initialValues={{}}
            getConfirmationMessage={() => t(tKeys.modules.savings.allocateDialog.getKey())}
            onSubmit={handleFormSubmit}
            submitButton={t(tKeys.modules.savings.allocate.getKey())}
            CustomFormTemplate={CustomFormTemplate}
          >
            <Grid container alignItems="flex-start" spacing={3}>
              {pools.map(pool => (
                <Grid key={pool.address} item xs={4}>
                  <SavingsPoolField pool={pool} name={`key${pool.address}`} />
                </Grid>
              ))}
            </Grid>
          </FormWithConfirmation>
        )}
      </Loading>
    </>
  );
}

const useStyles = makeStyles(() => ({
  allocateTabDescription: {
    marginBottom: 40,
  },
}));
