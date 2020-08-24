import React, { useCallback, useState } from 'react';

import { Button, ButtonProps } from 'components/Button';
import { GradientArrow } from 'components/icons';
import { makeStyles, useTheme } from 'utils/styles';

export function GradientArrowButton<C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }>,
) {
  const { children, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();

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
      fontSize: '11px !important',
      marginBottom: '-0.25em',
    },
  }),
  { name: 'GradientArrowButton' },
);
