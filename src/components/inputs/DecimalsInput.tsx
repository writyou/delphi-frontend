import React, { useCallback, useEffect, useState, useMemo, ComponentPropsWithoutRef } from 'react';
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
    ...restInputProps
  } = props;

  const [suffix, setSuffix] = useState('');
  const [needToShowEmpty, setNeedToShowEmpty] = useState(() => !value || value === '0');

  useEffect(() => {
    needToShowEmpty && value && value !== '0' && setNeedToShowEmpty(false);
  }, [needToShowEmpty, value]);

  useEffect(() => setSuffix(''), [value, baseDecimals]);

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
    [baseDecimals, value],
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
        endAdornment: maxValue && (
          <Button disabled={disabled} onClick={handleMaxButtonClick} className={classes.maxButton}>
            MAX
          </Button>
        ),
      }}
    />
  );
}

const useStyles = makeStyles(() => ({
  maxButton: {
    fontSize: 10,
    padding: 11,
    minWidth: 'unset',
  },
}));

export { DecimalsInput };
