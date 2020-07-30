import React from 'react';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation } from 'components/form';
import { DepositToSavingsPool, SavingsPool } from 'model/types';
import { TokenAmount } from 'model/entities';

import { AllocateFormTemplate } from './AllocateFormTemplate';
import { SavingsPoolField } from './SavingsPoolField/SavingsPoolField';

type AllocateFormProps = {
  pools: SavingsPool[];
};

export type FormData = Record<string, TokenAmount>;

// https://github.com/final-form/react-final-form/blob/master/docs/faq.md#why-cant-i-have-numeric-keys-in-an-object
export const stringifyName = (value: string) => `key${value}`;
export const destringifyName = (value: string) => value.substring(3);

export function AllocateForm({ pools }: AllocateFormProps) {
  const { t } = useTranslate();
  const api = useApi();

  const handleFormSubmit = (data: FormData) => {
    const filteredData = Object.keys(data).reduce((acc, key) => {
      const poolAddress = destringifyName(key);
      const amount = data[key];

      return amount.isZero() ? acc : [...acc, { amount, poolAddress }];
    }, [] as DepositToSavingsPool[]);
    return filteredData.length ? api.savings.deposit(filteredData) : undefined;
  };

  return (
    <FormWithConfirmation<FormData>
      initialValues={{}}
      getConfirmationMessage={() => t(tKeys.modules.savings.allocateDialog.getKey())}
      onSubmit={handleFormSubmit}
      submitButton={t(tKeys.modules.savings.allocate.getKey())}
      CustomFormTemplate={AllocateFormTemplate}
    >
      {pools.map(pool => (
        <SavingsPoolField key={pool.address} pool={pool} name={stringifyName(pool.address)} />
      ))}
    </FormWithConfirmation>
  );
}
