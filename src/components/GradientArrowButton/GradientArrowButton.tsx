import React from 'react';
import { ButtonTypeMap } from '@material-ui/core/Button';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

import { Button } from 'components/Button';
import { GradientArrow } from 'components/icons';
import { makeStyles } from 'utils/styles';

export type ButtonProps<
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonTypeMap<P, D>, D>;

export function GradientArrowButton<P = {}, D extends React.ElementType = 'button'>(
  props: ButtonProps<D, P>,
) {
  const { children, ...rest } = props;
  const classes = useStyles();

  return (
    <Button
      {...rest}
      variant="text"
      color="primary"
      endIcon={<GradientArrow className={classes.arrow} />}
    >
      {children}
    </Button>
  );
}

const useStyles = makeStyles(
  () => ({
    arrow: {
      fontSize: '44px !important',
      height: 11,
    },
  }),
  { name: 'GradientArrowButton' },
);
