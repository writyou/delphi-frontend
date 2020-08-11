import React, { useMemo } from 'react';
import BN from 'bn.js';
// eslint-disable-next-line no-restricted-imports
import { Grid } from '@material-ui/core';

import { TokenAmount, Token } from 'model/entities';
import { ALL_TOKEN } from 'utils/mock';
import { TokensIcons } from 'components/TokensIcons/TokensIcons';
import { TokenName } from 'components/TokenName/TokenName';

import { AmountInput, AmountInputProps } from './AmountInput/AmountInput';

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
    <Grid container alignItems="center" wrap="nowrap">
      <TokensIcons tokens={currencies.filter(t => t !== ALL_TOKEN)} />
      &nbsp;
      {currency.symbol}
    </Grid>
  ) : (
    <TokenName token={currency} />
  );
}

function makeAmount(value: BN, currency: Token) {
  return new TokenAmount(value, currency);
}