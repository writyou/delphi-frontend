import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  ComponentPropsWithoutRef,
  useRef,
} from 'react';
import BN from 'bn.js';

import { fromBaseUnit, toBaseUnit } from 'utils/bn';
import { makeStyles } from 'utils/styles';
import { IToBN } from 'model/types';

import { Button } from '../Button/Button';
import { TextInput } from './TextInput';

interface IOwnProps {
  baseDecimals: number;
  baseUnitName?: string;
  value: string;
  maxValue?: BN | IToBN;
  onChange: (value: string) => void;
}

type IProps = IOwnProps & Omit<ComponentPropsWithoutRef<typeof TextInput>, 'onChange'>;

function DecimalsInput(props: IProps) {
  const classes = useStyles();
  const {
    onChange,
    baseDecimals,
    value,
    maxValue,
    baseUnitName,
    disabled,
    InputProps,
    ...restInputProps
  } = props;

  const [suffix, setSuffix] = useState('');
  const [needToShowEmpty, setNeedToShowEmpty] = useState(() => !value || value === '0');
  const prevBaseDecimals = usePrevious(baseDecimals);

  useEffect(() => {
    needToShowEmpty && value && value !== '0' && setNeedToShowEmpty(false);
  }, [needToShowEmpty, value]);

  useEffect(() => setSuffix(''), [value, baseDecimals]);

  useEffect(() => {
    if (prevBaseDecimals !== baseDecimals) {
      const decimalsDiff = prevBaseDecimals ? new BN(baseDecimals - prevBaseDecimals) : new BN(0);
      if (decimalsDiff.eqn(0)) {
        return;
      }

      const decimalCorrectionFactor = new BN(10).pow(decimalsDiff);
      const adjustedValue = decimalsDiff.gtn(0)
        ? new BN(value).mul(decimalCorrectionFactor)
        : new BN(value).div(decimalCorrectionFactor);

      onChange(adjustedValue.toString());
    }
  }, [prevBaseDecimals, baseDecimals, value, onChange]);

  const amount = useMemo(() => value && fromBaseUnit(value, baseDecimals) + suffix, [
    value,
    suffix,
    baseDecimals,
  ]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const maxFractionLength = baseDecimals;
      const inputValidationRegExp = new RegExp(
        `^$|^\\d+?${maxFractionLength > 0 ? `(\\.?\\d{0,${maxFractionLength}})` : ''}$`,
      );

      if (inputValidationRegExp.test(event.target.value)) {
        if (!event.target.value) {
          setNeedToShowEmpty(true);
          setSuffix('');
          onChange('0');
          return;
        }

        setNeedToShowEmpty(false);

        const nextValue = toBaseUnit(event.target.value, baseDecimals).toString();

        if (nextValue !== value) {
          onChange(nextValue);
        }

        const suffixMatch = event.target.value.match(/^.+?((\.|\.0+)|(\.[0-9]*?(0*)))$/);

        if (suffixMatch) {
          const [, , dotWithZeros, , zerosAfterDot] = suffixMatch;
          setSuffix(dotWithZeros || zerosAfterDot || '');
        } else {
          setSuffix('');
        }
      }
    },
    [baseDecimals, value, onChange],
  );

  const handleMaxButtonClick = React.useCallback(() => {
    setSuffix('');
    maxValue && onChange(maxValue.toString());
  }, [onChange, maxValue && maxValue.toString()]);

  return (
    <TextInput
      {...restInputProps}
      disabled={disabled}
      value={needToShowEmpty ? '' : amount}
      variant="outlined"
      fullWidth
      onChange={handleInputChange}
      InputProps={{
        ...InputProps,
        endAdornment: maxValue && (
          <Button disabled={disabled} onClick={handleMaxButtonClick} className={classes.maxButton}>
            MAX
          </Button>
        ),
      }}
    />
  );
}

function usePrevious<T extends {}>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const useStyles = makeStyles(() => ({
  maxButton: {
    fontSize: 10,
    padding: 11,
    minWidth: 'unset',
  },
}));

export { DecimalsInput };
