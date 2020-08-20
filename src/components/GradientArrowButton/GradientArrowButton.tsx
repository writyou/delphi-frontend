import React, { useCallback, useState } from 'react';
import { ButtonTypeMap } from '@material-ui/core/Button';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

import { Button } from 'components/Button';
import { GradientArrow } from 'components/icons';
import { makeStyles, useTheme } from 'utils/styles';

export type ButtonProps<
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonTypeMap<P, D>, D>;

export function GradientArrowButton<P = {}, D extends React.ElementType = 'button'>(
  props: ButtonProps<D, P>,
) {
  const { children, id, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonMouseOver = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleButtonMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <>
      <Button
        {...rest}
        variant="text"
        color="primary"
        endIcon={
          <GradientArrow
            id={id}
            fill={isHovered ? theme.colors.heliotrope : undefined}
            className={classes.arrow}
          />
        }
        onMouseOver={handleButtonMouseOver}
        onFocus={handleButtonMouseOver}
        onMouseOut={handleButtonMouseLeave}
        onBlur={handleButtonMouseLeave}
      >
        {children}
      </Button>
    </>
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
