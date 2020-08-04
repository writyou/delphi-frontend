// @ts-nocheck
import React, {
  useEffect,
  useCallback,
  ComponentPropsWithoutRef,
  useRef,
  useState,
  useMemo,
} from 'react';
import BN from 'bn.js';
import { Observable } from 'rxjs';
import MenuItem from '@material-ui/core/MenuItem';

import { toObservable } from 'utils/rxjs';
import { Amount } from 'model/entities';
import { makeStyles } from 'utils/styles';
import { IToBN } from 'model/types';
import { useSubscribable } from 'utils/react';

import { TextInput } from './TextInput';
import { DecimalsInput } from './DecimalsInput';
import { SelectInput } from './SelectInput';

interface IOwnProps<A extends Amount> {
  currencies: Array<A['currency']>;
  value: A | null | '';
  maxValue?: BN | IToBN | Observable<BN | IToBN>;
  onChange: (value: A) => void;
  makeAmount(value: BN, currency: A['currency']): A;
  getCurrencyIdentifier: (currency: A['currency']) => string;
  getCurrencyLabel: (currency: A['currency'], currencies: A['currency'][]) => JSX.Element | string;
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

  const handleCurrencyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      const currency =
        getCurrencyIdentifier && currencies.find(item => getCurrencyIdentifier(item) === nextValue);

      currency && onChange(makeAmount(currentValue, currency));
    },
    [onChange, maxValue?.toString(), currentCurrencyUpdatingTrigger],
  );

  const currencySelectOptions = useMemo(
    () =>
      getCurrencyLabel && getCurrencyIdentifier
        ? currencies.map(item => ({
            id: getCurrencyIdentifier(item),
            label: getCurrencyLabel(item, currencies),
          }))
        : [],
    [currencies, getCurrencyIdentifier, getCurrencyLabel],
  );

  return (
    <div className={classes.root}>
      <div className={classes.decimalInputWrapper}>
        <DecimalsInput
          {...restInputProps}
          baseDecimals={currentDecimals}
          value={currentValue.toString()}
          maxValue={maxValue}
          onChange={handleInputChange}
          InputProps={{
            className: classes.decimalInput,
          }}
        />
      </div>
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

const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
    },
    decimalInputWrapper: {
      position: 'relative',
      zIndex: 1,
    },
    decimalInput: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    select: {
      flexShrink: 0,

      // Hint to merge select left border with the right border of the text input
      marginLeft: -1,
    },
    selectInput: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  }),
  { name: 'AmountInput' },
);

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
