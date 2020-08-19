import React from 'react';
import cn from 'classnames';

import { makeStyles } from 'utils/styles';
import { CatsPaw, CatsPawProps } from 'components/icons';

type Props = {
  size: 'extra-small' | 'extra-large';
};

export function CatsPawPlaceholder(props: Props & CatsPawProps) {
  const classes = useStyles();
  const { size, ...rest } = props;

  return (
    <div
      className={cn(classes.root, {
        [classes.isExtraSmall]: size === 'extra-small',
        [classes.isExtraLarge]: size === 'extra-large',
      })}
    >
      <CatsPaw {...rest} fontSize="inherit" />
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      '&$isExtraSmall': {
        fontSize: 50,
      },

      '&$isExtraLarge': {
        fontSize: 145,
      },
    },

    isExtraSmall: {},
    isExtraLarge: {},
  }),
  { name: 'CatsPawPlaceholder' },
);
