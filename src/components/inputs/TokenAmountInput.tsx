import React, { useMemo } from 'react';
import BN from 'bn.js';
// eslint-disable-next-line no-restricted-imports
import { Grid } from '@material-ui/core';

import { TokenAmount, Token } from 'model/entities';
import { ALL_TOKEN } from 'utils/mock';

import { AmountInput, AmountInputProps } from './AmountInput';
import { TokenIcon } from '../TokenIcon/TokenIcon';

export type TokenAmountInputProps = Omit<
  AmountInputProps<TokenAmount>,
  'makeAmount' | 'getCurrencyIdentifier' | 'getCurrencyLabel'
> & { allowSelectAllToken?: boolean };

export function TokenAmountInput(props: TokenAmountInputProps) {
  const { allowSelectAllToken, currencies, ...rest } = props;
  const tokens = useMemo(
    () => (allowSelectAllToken && currencies.length > 1 ? [...currencies, ALL_TOKEN] : currencies),
    [allowSelectAllToken, currencies],
  );

  return (
    <AmountInput<TokenAmount>
      {...rest}
      currencies={tokens}
      makeAmount={makeAmount}
      getCurrencyIdentifier={getCurrencyIdentifier}
      getCurrencyLabel={getCurrencyLabel}
    />
  );
}

function getCurrencyIdentifier(currency: Token) {
  return currency.address;
}

function getCurrencyLabel(currency: Token, currencies: Token[]) {
  return currency === ALL_TOKEN ? (
    <Grid container alignItems="center">
      {currencies
        .filter(t => t !== ALL_TOKEN)
        .map(t => (
          <>
            <TokenIcon tokenAddress={t.address} />
            &nbsp;
          </>
        ))}
      {currency.symbol}
    </Grid>
  ) : (
    <Grid container alignItems="center">
      <TokenIcon tokenAddress={currency.address} />
      &nbsp;
      {currency.symbol}
    </Grid>
  );
}

function makeAmount(value: BN, currency: Token) {
  return new TokenAmount(value, currency);
}
