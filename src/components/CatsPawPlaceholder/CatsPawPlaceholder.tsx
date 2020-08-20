import React from 'react';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';
import { CatPaws, CatPawsProps } from 'components/icons';

type Props = {
  size: 'extra-small' | 'extra-large';
};

export function CatsPawPlaceholder(props: Props & CatPawsProps) {
  const classes = useStyles();
  const { size, ...rest } = props;

  return (
    <div
      className={cn(classes.root, {
        [classes.isExtraSmall]: size === 'extra-small',
        [classes.isExtraLarge]: size === 'extra-large',
      })}
    >
      <CatPaws {...rest} fontSize="inherit" />
    </div>
  );
}

const useStyles = makeStyles(
  theme => ({
    root: {
      '&$isExtraSmall': {
        fontSize: theme.sizes.chartWidth.xs * 0.85,
      },

      '&$isExtraLarge': {
        fontSize: theme.sizes.chartWidth.xl * 0.85,
      },
    },

    isExtraSmall: {},
    isExtraLarge: {},
  }),
  { name: 'CatsPawPlaceholder' },
);
