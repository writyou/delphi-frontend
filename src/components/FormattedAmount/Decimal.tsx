import * as React from 'react';
import cn from 'classnames';
import { Decimal as DecimalType, formatInteger } from '@akropolis-web/primitives';

import { makeStyles } from 'utils/styles';

type Props = {
  decimal: DecimalType;
  variant?: 'plain' | 'default';
};

export function Decimal(props: Props) {
  const {
    decimal: { integer, fractional },
    variant,
  } = props;
  const classes = useStyles(props);

  return (
    <>
      {formatInteger(integer)}
      {fractional && (
        <span className={cn({ [classes.fractional]: variant === 'default' })}>.{fractional}</span>
      )}
    </>
  );
}

const useStyles = makeStyles(
  () => ({
    fractional: {
      color: '#494972',
    },
  }),
  { name: 'Decimal' },
);
