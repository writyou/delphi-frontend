import React, { useState, useCallback } from 'react';
import cn from 'classnames';

import { Button, ButtonProps } from 'components/Button';
import { GradientArrow } from 'components/icons';
import { makeStyles } from 'utils/styles';
import { useBreakpointsMatch } from 'services/adaptability';

type OwnProps = {
  isHovered?: boolean;
};

export function GradientArrowButton<C extends React.ElementType>(
  props: OwnProps & ButtonProps<C, { component?: C }>,
) {
  const { children, isHovered, ...rest } = props;
  const classes = useStyles();
  const [localIsHovered, setLocalIsHovered] = useState(false);

  const isMobile = useBreakpointsMatch({ to: 'tabletXS' });

  const handleButtonMouseOver = useCallback(() => {
    setLocalIsHovered(true);
  }, []);

  const handleButtonMouseLeave = useCallback(() => {
    setLocalIsHovered(false);
  }, []);
  return (
    <>
      <Button
        {...rest}
        variant="text"
        color="primary"
        endIcon={<GradientArrow className={classes.arrow} size={isMobile ? 'small' : 'medium'} />}
        className={cn(classes.root, { [classes.isHovered]: isHovered || localIsHovered })}
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
  theme => ({
    root: {
      '&$isHovered': {
        color: theme.colors.heliotrope,
        backgroundColor: 'transparent',
        backgroundSize: '500%',

        '& stop': {
          stopColor: theme.colors.heliotrope,
        },
      },
    },
    arrow: {
      fontSize: '11px !important',
      marginBottom: '-0.25em',
    },
    isHovered: {},
  }),
  { name: 'GradientArrowButton' },
);
