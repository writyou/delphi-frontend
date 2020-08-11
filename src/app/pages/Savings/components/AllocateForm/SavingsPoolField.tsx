import React, { useCallback, useState } from 'react';
import { FieldRenderProps, FormSpy } from 'react-final-form';
import { empty, Observable, combineLatest } from 'rxjs';
import { FormState } from 'final-form';
import { map } from 'rxjs/operators';

import { useApi } from 'services/api';
import { SavingsPool } from 'model/types';
import { tKeys, useTranslate } from 'services/i18n';
import { TokenAmount, Token, Amount } from 'model/entities';
import { SwitchInput, TokenAmountInputProps, TokenAmountInput } from 'components/inputs';
import { getFieldWithComponent, useValidateAmount, useSubscribable } from 'utils/react';
import { SpyField } from 'components';
import { min } from 'utils/bn';
import { denormolizeAmount } from 'utils/amounts';

import { SavingsPoolCard } from '../SavingsPoolCard/SavingsPoolCard';

export function SavingsPoolField({ name, pool }: { name: string; pool: SavingsPool }) {
  const api = useApi();

  const [currentToken, setCurrentToken] = useState<Token | null>(null);

  const getDepositLimit$ = useCallback(() => api.user.getSavingsDepositLimit$(pool.address), [
    api,
    pool.address,
  ]);

  const [validationParams] = useSubscribable(
    () =>
      currentToken
        ? combineLatest([api.user.getTokenBalance$(currentToken.address), getDepositLimit$()]).pipe(
            map(([balance, limit]) => {
              const denormalizedLimit = limit && denormolizeAmount(limit, balance.currency);
              const maxValue = denormalizedLimit ? min(balance, denormalizedLimit) : balance;
              return {
                maxValue,
                maxErrorTKey: maxValue.eq(balance)
                  ? tKeys.utils.validation.insufficientFunds.getKey()
                  : tKeys.utils.validation.depositLimitExceeded.getKey(),
              };
            }),
          )
        : empty(),
    [api, currentToken, getDepositLimit$],
  );

  const maxValue = validationParams?.maxValue;
  const maxErrorTKey = validationParams?.maxErrorTKey;

  const handleFormChange = useCallback(
    (data: FormState<FormData>) => {
      const amount = data.values[name];
      if (!currentToken || !amount || !currentToken.equals(amount.currency)) {
        setCurrentToken(amount?.currency || null);
      }
    },
    [currentToken],
  );

  const validateAmount = useValidateAmount({
    maxValue,
    maxErrorTKey,
  });

  return (
    <>
      <SavingsPoolWithFieldWrapper
        name={name}
        pool={pool}
        getDepositLimit$={getDepositLimit$}
        validate={validateAmount}
        currentToken={currentToken}
        maxValue={maxValue}
      />
      <SpyField name="_" fieldValue={validateAmount} />
      <FormSpy<FormData> subscription={{ values: true }} onChange={handleFormChange} />
    </>
  );
}

const SavingsPoolWithFieldWrapper = getFieldWithComponent(SavingsPoolFieldComponent);

type Props = Omit<TokenAmountInputProps, 'onChange' | 'value' | 'helperText' | 'currencies'> &
  FieldRenderProps<TokenAmountInputProps['value'], HTMLElement> & {
    pool: SavingsPool;
    maxValue: TokenAmount | undefined;
    getDepositLimit$(): Observable<Amount | null>;
    currentToken: Token | null;
  };

type FormData = Record<string, TokenAmount>;

function SavingsPoolFieldComponent(props: Props) {
  const { input, meta, pool, currentToken, maxValue, getDepositLimit$, ...rest } = props;
  const { t } = useTranslate();

  const [depositLimit, depositLimitMeta] = useSubscribable(getDepositLimit$, [getDepositLimit$]);

  const [isAllocated, setIsAllocated] = useState<boolean>(false);

  const handleSwitch = () => {
    if (currentToken && isAllocated) {
      input.onChange(new TokenAmount(0, currentToken));
    }
    setIsAllocated(!isAllocated);
  };

  const switchDisabled = depositLimitMeta.loaded && !!depositLimit && !depositLimit.gt(0);
  const switchChecked = !switchDisabled && isAllocated;

  const error =
    typeof rest.error === 'boolean'
      ? rest.error && meta.error && t(meta.error)
      : meta.touched && meta.error && t(meta.error);

  return (
    <SavingsPoolCard
      pool={pool}
      getDepositLimit$={getDepositLimit$}
      content={
        <SwitchInput
          disabled={switchDisabled}
          checked={switchChecked}
          label={t(tKeys.modules.savings.allocate.getKey())}
          onChange={handleSwitch}
        />
      }
      additionalElement={
        switchChecked ? (
          <TokenAmountInput
            {...rest}
            {...input}
            helperText={error}
            error={Boolean(error)}
            name={`key${pool.address}`}
            currencies={pool.tokens}
            placeholder="Enter sum"
            maxValue={maxValue}
          />
        ) : undefined
      }
    />
  );
}
