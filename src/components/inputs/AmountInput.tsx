import React, { useEffect, useCallback, ComponentPropsWithoutRef, useRef, useState } from 'react';
import BN from 'bn.js';
import MenuItem from '@material-ui/core/MenuItem';
import { Observable } from 'rxjs';

import { toObservable } from 'utils/rxjs';
import { Amount } from 'model/entities';
import { makeStyles } from 'utils/styles';
import { IToBN } from 'model/types';
import { useSubscribable } from 'utils/react';

import { TextInput } from './TextInput';
import { DecimalsInput } from './DecimalsInput';

interface IOwnProps<A extends Amount> {
  currencies: Array<A['currency']>;
  value: A | null | '';
  maxValue?: BN | IToBN | Observable<BN | IToBN>;
  onChange: (value: A) => void;
  makeAmount(value: BN, currency: A['currency']): A;
  getCurrencyIdentifier(currency: A['currency']): string;
  getCurrencyLabel(currency: A['currency'], currencies: A['currency'][]): JSX.Element | string;
}

export type AmountInputProps<A extends Amount> = IOwnProps<A> &
  Omit<ComponentPropsWithoutRef<typeof TextInput>, 'onChange'>;

// TODO add support of negative value
export function AmountInput<A extends Amount>(props: AmountInputProps<A>) {
  const {
    onChange,
    value,
    maxValue: max,
    disabled,
    currencies,
    makeAmount,
    getCurrencyIdentifier,
    getCurrencyLabel,
    ...restInputProps
  } = props;
  const classes = useStyles();

  const tokenAmount = value || null;

  const defaultCurrency = currencies[0] as A['currency'] | undefined;

  const currentValue = tokenAmount?.toBN() || new BN(0);
  const currentCurrency = tokenAmount?.currency || defaultCurrency;
  const currentDecimals = currentCurrency?.decimals || 0;

  const currentCurrencyUpdatingTrigger = useUpdatingTrigger(currentCurrency, (a, b) =>
    Boolean(a && b && a.equals(b)),
  );

  const isDisabledCurrencySelector = Boolean(currencies.length <= 1 && currentCurrency);

  // initialize or update value if currencies is not contain current currency
  useEffect(() => {
    const isWrongCurrentCurrency =
      currentCurrency && !currencies.find(item => item.equals(currentCurrency));

    if (defaultCurrency && (!tokenAmount || isWrongCurrentCurrency)) {
      // async change is necessary for the correct working of subscriptions in the final-form during the first render
      Promise.resolve().then(() => onChange(makeAmount(currentValue, defaultCurrency)));
    }
  }, [currentCurrency, currencies]);

  const handleInputChange = useCallback(
    (nextValue: string) => {
      currentCurrency && onChange(makeAmount(new BN(nextValue), currentCurrency));
    },
    [currentDecimals, currentCurrencyUpdatingTrigger],
  );

  const [maxValue] = useSubscribable(() => toObservable(max), [max]);

  const handleCurrencyChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      const currency = currencies.find(item => getCurrencyIdentifier(item) === nextValue);

      currency && onChange(makeAmount(currentValue, currency));
    },
    [onChange, maxValue?.toString(), currentCurrencyUpdatingTrigger],
  );

  return (
    <div className={classes.root}>
      <DecimalsInput
        {...restInputProps}
        baseDecimals={currentDecimals}
        value={currentValue.toString()}
        maxValue={maxValue}
        onChange={handleInputChange}
      />
      {/* TODO: replace with customized Select */}
      <TextInput
        select
        disabled={isDisabledCurrencySelector}
        value={currentCurrency && getCurrencyIdentifier(currentCurrency!)}
        variant="outlined"
        onChange={handleCurrencyChange}
      >
        {currencies.map(item => {
          const id = getCurrencyIdentifier(item);
          return (
            <MenuItem key={id} value={id}>
              {getCurrencyLabel(item, currencies)}
            </MenuItem>
          );
        })}
      </TextInput>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  amount: {
    width: 0,
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
}));

function useUpdatingTrigger<V>(deps: V, isEquals: (prev: V, cur: V) => boolean) {
  const prevValueRef = useRef<V>();
  const [updatedDepsTrigger, setUpdatedDepsTrigger] = useState<{}>(() => ({}));

  useEffect(() => {
    const prevDeps = prevValueRef.current;
    prevValueRef.current = deps;

    if (prevDeps && !isEquals(prevDeps, deps)) {
      setUpdatedDepsTrigger({});
    }
  }, [deps]);

  return updatedDepsTrigger;
}
