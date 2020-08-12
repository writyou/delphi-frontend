import React from 'react';
import { FormSpy } from 'react-final-form';
import * as R from 'ramda';
import { FormApi } from 'final-form';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation } from 'components/form';
import { SavingsPool } from 'model/types';
import { TokenAmount } from 'model/entities';
import { InfiniteApproveSwitch } from 'features/infiniteApprove';
import { ETH_NETWORK_CONFIG } from 'env';

import { getDeposits } from './getDeposits';
import { stringifyName } from './utils';
import { AllocateFormTemplate } from './AllocateFormTemplate';
import { SavingsPoolField } from './SavingsPoolField';
import { AllocateFormConfirmationContent } from './AllocateFormConfirmationContent';

type AllocateFormProps = {
  pools: SavingsPool[];
};

export type FormData = Record<string, TokenAmount> & { _: () => void };

export function AllocateForm({ pools }: AllocateFormProps) {
  const { t } = useTranslate();
  const api = useApi();

  const handleFormSubmit = async (data: FormData, form: FormApi<FormData>) => {
    const filteredData = getDeposits(data);

    if (filteredData.length) {
      await api.savings.deposit(filteredData);
    }

    form.reset();
  };

  return (
    <FormWithConfirmation<FormData>
      DialogContent={AllocateFormConfirmationContent}
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
