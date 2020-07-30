import React, { useCallback, useMemo, useState } from 'react';
import { FormSpy, FieldRenderProps } from 'react-final-form';
import { FormState } from 'final-form';
import { empty } from 'rxjs';

import { useApi } from 'services/api';
import { SavingsPool } from 'model/types';
import { tKeys, useTranslate } from 'services/i18n';
import { TokenAmount, Token } from 'model/entities';
import { routes } from 'app/routes';
import { SwitchInput, TokenAmountInputProps, TokenAmountInput } from 'components/inputs';
import { getFieldWithComponent } from 'utils/react';

import { SavingsPoolCard, WithViewDetails } from '../SavingsPoolCard/SavingsPoolCard';

type IProps = Omit<TokenAmountInputProps, 'onChange' | 'value' | 'helperText' | 'currencies'> &
  FieldRenderProps<TokenAmountInputProps['value'], HTMLElement>;
type Props = {
  pool: SavingsPool;
};

type FormData = Record<string, TokenAmount | undefined>;

export function SavingsPoolFieldComponent(props: Props & IProps) {
  const { input, meta, pool, ...rest } = props;
  const api = useApi();
  const { t } = useTranslate();
  const [isAllocated, setIsAllocated] = useState<boolean>(false);
  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const maxValue$ = useMemo(
    () => (currentToken ? api.user.getTokenBalance$(currentToken.address) : empty()),
    [api, currentToken],
  );

  const handleFormChange = useCallback(
    (d: FormState<FormData>) => {
      const amount = d.values['key' + pool.address];
      if (!currentToken || !amount || !currentToken.equals(amount.currency)) {
        const token = amount?.currency || pool.tokens[0];
        setCurrentToken(token);
      }
    },
    [currentToken],
  );

  const handleSwitch = () => {
    if (currentToken && isAllocated) {
      input.onChange(new TokenAmount(0, currentToken));
    }
    setIsAllocated(!isAllocated);
  };

  return (
    <SavingsPoolCard
      pool={pool}
      footerElement={
        <WithViewDetails
          link={routes.savings.pool.id.getRedirectPath({ id: pool.address })}
          content={
            <span>
              <SwitchInput checked={isAllocated} onChange={handleSwitch} />
              {t(tKeys.modules.savings.allocate.getKey())}
            </span>
          }
          additionalElement={
            isAllocated ? (
              <>
                <TokenAmountInput
                  {...input}
                  {...rest}
                  name={'key' + pool.address}
                  currencies={pool.tokens}
                  placeholder="Enter sum"
                  // validate={validateAmount}
                  maxValue={maxValue$}
                />
                <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
              </>
            ) : undefined
          }
        />
      }
    />
  );
}

export const SavingsPoolField = getFieldWithComponent(SavingsPoolFieldComponent);
