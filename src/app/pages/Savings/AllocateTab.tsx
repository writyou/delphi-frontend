import React from 'react';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { Loading, Grid } from 'components';
import { TokenAmount } from 'model/entities';
import { makeStyles } from 'utils/styles';
import { FormWithConfirmation } from 'components/form';

import { SavingsPoolField } from './SavingsPoolField/SavingsPoolField';

type FormData = Record<string, TokenAmount>;

export function AllocateTab() {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();
  const [pools, poolsMeta] = useSubscribable(() => api.savings.getPools$(), [api]);

  const handleFormSubmit = (data: FormData) => {
    const filteredData = Object.keys(data).reduce((acc, key) => {
      const address = key.substring(3);
      const value = data[key];

      return value.isZero() ? acc : { ...acc, [address]: value };
    }, {});
    console.log('submit', data, filteredData);
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
            getConfirmationMessage={() => 'some text'}
            onSubmit={handleFormSubmit}
            submitButton={t(tKeys.modules.savings.allocate.getKey())}
          >
            <Grid container alignItems="flex-start" spacing={3}>
              {pools.map(pool => (
                <Grid key={pool.address} item xs={4}>
                  <SavingsPoolField pool={pool} name={'key' + pool.address} />
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
