import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, ButtonProps } from 'components/Button';
import { GradientArrow } from 'components/icons';
import { makeStyles } from 'utils/styles';

export function GradientArrowButton(props: ButtonProps<typeof RouterLink>) {
  const { children, to, ...rest } = props;
  const classes = useStyles();

  return (
    <Button
      {...rest}
      variant="text"
      color="primary"
      component={RouterLink}
      to={to}
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
