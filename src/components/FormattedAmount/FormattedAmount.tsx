import React from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import BN from 'bn.js';
import cn from 'classnames';
import {
  Amount,
  LiquidityAmount,
  TokenAmount,
  PercentAmount,
  getDecimal,
  roundWei,
} from '@akropolis-web/primitives';

import { makeStyles } from 'utils/styles';
import { SIGNIFICANT_FRACTIONAL_DIGITS } from 'env';

import { Decimal } from './Decimal';

export interface FormattedAmountProps {
  sum: Amount;
  precision?: number;
  hideSymbol?: boolean;
  className?: string;
  hasSign?: boolean;
  variant?: 'plain' | 'default';
}

const percentPrecision = 5;

export function FormattedAmount(props: FormattedAmountProps) {
  const { sum, hideSymbol, precision = 2, className, hasSign = false, variant = 'default' } = props;
  const formattedBalance = sum.toFormattedString(precision);
  const notRoundedBalance = sum.toFormattedString(
    sum instanceof PercentAmount ? percentPrecision : sum.currency.decimals,
  );
  const needToRenderPlus = hasSign && sum.gt(0);

  return (
    <Tooltip title={notRoundedBalance}>
      <span className={className}>
        {(sum instanceof LiquidityAmount &&
          renderLiquidityAmount(sum, precision, hideSymbol, needToRenderPlus, variant)) ||
          (sum instanceof TokenAmount &&
            renderTokenAmount(sum, precision, hideSymbol, needToRenderPlus, variant)) ||
          (sum instanceof PercentAmount &&
            renderPercentAmount(sum, precision, needToRenderPlus, variant)) ||
          formattedBalance}
      </span>
    </Tooltip>
  );
}

function renderLiquidityAmount(
  sum: LiquidityAmount,
  precision: number,
  hideSymbol: boolean | undefined,
  needToRenderPlus: boolean,
  variant: 'plain' | 'default',
) {
  const roundedSum = roundWei(
    sum.toBN(),
    sum.currency.decimals,
    'half-away-from-zero',
    SIGNIFICANT_FRACTIONAL_DIGITS,
  );
  const decimal = getDecimal(roundedSum.abs().toString(), sum.currency.decimals, precision);

  return (
    <>
      {(sum.isNeg() && '-') || (needToRenderPlus && '+')}
      {!hideSymbol && sum.currency.symbol}
      <Decimal decimal={decimal} variant={variant} />
    </>
  );
}

function renderTokenAmount(
  sum: TokenAmount,
  precision: number,
  hideSymbol: boolean | undefined,
  needToRenderPlus: boolean,
  variant: 'plain' | 'default',
) {
  const classes = useStyles();

  const roundedSum = roundWei(
    sum.toBN(),
    sum.currency.decimals,
    'half-away-from-zero',
    SIGNIFICANT_FRACTIONAL_DIGITS,
  );
  const decimal = getDecimal(roundedSum.abs().toString(), sum.currency.decimals, precision);

  return (
    <>
      {(sum.isNeg() && '-') || (needToRenderPlus && '+')}
      <Decimal decimal={decimal} variant={variant} />
      {!hideSymbol && (
        <span className={cn({ [classes.tokenSymbol]: variant === 'default' })}>
          &nbsp;{sum.currency.symbol}
        </span>
      )}
    </>
  );
}

function renderPercentAmount(
  sum: PercentAmount,
  precision: number,
  needToRenderPlus: boolean,
  variant: 'plain' | 'default',
) {
  const classes = useStyles();

  return (
    <span
      className={cn({
        [classes.percentRoot]: variant === 'default',
        [classes.isZero]: sum.isZero(),
      })}
    >
      {(sum.isNeg() && '-') || (needToRenderPlus && '+')}
      {(sum.isNeg() ? sum.mul(new BN(-1)) : sum).toFormattedString(precision, false)}
      <span className={classes.percentSymbol}>{sum.currency.symbol}</span>
    </span>
  );
}

const useStyles = makeStyles(
  {
    percentRoot: {
      display: 'inline-flex',
      flexWrap: 'nowrap',
      lineHeight: 'normal',

      '& $percentSymbol': {
        fontSize: '0.5em',
        paddingLeft: 2,
        lineHeight: '2.2em',
      },
      '&$isZero': {
        opacity: 0.5,
      },
    },

    tokenSymbol: {
      fontSize: '0.5em',
    },

    percentSymbol: {},
    isZero: {},
  },
  { name: 'FormattedAmount' },
);
