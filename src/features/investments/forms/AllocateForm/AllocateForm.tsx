import React, { useCallback, memo } from 'react';
import { FormSpy } from 'react-final-form';
import * as R from 'ramda';
import { FormApi, FORM_ERROR } from 'final-form';
import { TokenAmount } from '@akropolis-web/primitives';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { FormWithConfirmation, AllocateFormTemplate, FormTemplateProps } from 'components/form';
import { InfiniteApproveSwitch } from 'features/infiniteApprove';
import { SavingsPool } from 'model/types';
import { ETH_NETWORK_CONFIG } from 'env';

import { getDeposits } from './getDeposits';
import { stringifyName } from './utils';
import { InvestmentsPoolField } from './InvestmentsPoolField';
import { AllocateFormConfirmationContent } from './AllocateFormConfirmationContent';

type AllocateFormProps = {
  pools: SavingsPool[];
  hasLimits: boolean;
};

export type FormData = Record<string, TokenAmount> & { _: () => void };

const validate = (values: FormData) => {
  const errors: any = {};
  if (getDeposits(values).length === 0) {
    errors[FORM_ERROR] = 'fields is empty';
  }

  return errors;
};

export const AllocateForm = memo(
  function AllocateForm({ pools, hasLimits }: AllocateFormProps) {
    const { t } = useTranslate();
    const api = useApi();

    const handleFormSubmit = async (data: FormData, form: FormApi<FormData>) => {
      const filteredData = getDeposits(data);

      if (filteredData.length) {
        await api.investments.deposit(filteredData);
      }

      form.reset();
    };

    const CustomFormTemplate = useCallback(
      (props: FormTemplateProps<FormData>) => (
        <AllocateFormTemplate
          {...props}
          infiniteUnlock={renderInfiniteUnlockSwitcher()}
          hasLimits={hasLimits}
        />
      ),
      [hasLimits],
    );

    return (
      <FormWithConfirmation<FormData>
        validate={validate}
        DialogContent={AllocateFormConfirmationContent}
        onSubmit={handleFormSubmit}
        submitButton={t(tKeys.modules.savings.allocate.getKey())}
        CustomFormTemplate={CustomFormTemplate}
      >
        {pools.map(pool => (
          <InvestmentsPoolField key={pool.address} pool={pool} name={stringifyName(pool.address)} />
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
  },
  (prev, cur) => R.toString(prev) === R.toString(cur),
);
