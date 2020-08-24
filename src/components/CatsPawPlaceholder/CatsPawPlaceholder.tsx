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
  () => ({
    root: {
      '&$isExtraSmall': {
        fontSize: 50,
        padding: 5,
      },

      '&$isExtraLarge': {
        fontSize: 145,
        padding: 12.5,
      },
    },

    isExtraSmall: {},
    isExtraLarge: {},
  }),
  { name: 'CatsPawPlaceholder' },
);
