import React, { useCallback, useMemo, useState } from 'react';
import { FieldRenderProps, FormSpy } from 'react-final-form';
import { empty, Observable } from 'rxjs';
import { FormState } from 'final-form';

import { useApi } from 'services/api';
import { SavingsPool } from 'model/types';
import { tKeys, useTranslate } from 'services/i18n';
import { TokenAmount, Token } from 'model/entities';
import { routes } from 'app/routes';
import { SwitchInput, TokenAmountInputProps, TokenAmountInput } from 'components/inputs';
import { getFieldWithComponent, useValidateAmount } from 'utils/react';

import { SavingsPoolCard, WithViewDetails } from '../SavingsPoolCard/SavingsPoolCard';

type Props = Omit<TokenAmountInputProps, 'onChange' | 'value' | 'helperText' | 'currencies'> &
  FieldRenderProps<TokenAmountInputProps['value'], HTMLElement> & {
    pool: SavingsPool;
    maxValue$: Observable<TokenAmount>;
    currentToken: Token | null;
  };

type FormData = Record<string, TokenAmount>;

export function SavingsPoolFieldComponent(props: Props) {
  const { input, meta, pool, currentToken, maxValue$, ...rest } = props;
  const { t } = useTranslate();
  const [isAllocated, setIsAllocated] = useState<boolean>(false);

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
                  name={`key${pool.address}`}
                  currencies={pool.tokens}
                  placeholder="Enter sum"
                  maxValue={maxValue$}
                />
              </>
            ) : undefined
          }
        />
      }
    />
  );
}

const SavingsPoolWithFieldWrapper = getFieldWithComponent(SavingsPoolFieldComponent);

export function SavingsPoolField(props: { name: string; pool: SavingsPool }) {
  const api = useApi();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const maxValue$ = useMemo(
    () => (currentToken ? api.user.getTokenBalance$(currentToken.address) : empty()),
    [api, currentToken],
  );

  const handleFormChange = useCallback(
    (data: FormState<FormData>) => {
      const amount = data.values[props.name];
      if (!currentToken || !amount || !currentToken.equals(amount.currency)) {
        setCurrentToken(amount?.currency || null);
      }
    },
    [currentToken],
  );

  const validateAmount = useValidateAmount({
    maxValue: maxValue$,
  });

  return (
    <>
      <SavingsPoolWithFieldWrapper
        {...props}
        validate={validateAmount}
        currentToken={currentToken}
        maxValue$={maxValue$}
      />
      <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
    </>
  );
}
