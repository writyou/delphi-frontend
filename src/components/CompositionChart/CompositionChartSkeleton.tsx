import React from 'react';
import cn from 'classnames';
import { SkeletonProps } from '@material-ui/lab/Skeleton';
import { Skeleton } from '@akropolis-web/components';

import { makeStyles } from 'utils/styles';

import { Size } from './model';

type Props = {
  size: Size;
};

export function CompositionChartSkeleton(props: Props & SkeletonProps) {
  const { size, ...rest } = props;
  const classes = useStyles();

  return (
    <Skeleton
      {...rest}
      variant="circle"
      className={cn(classes.root, {
        [classes.isExtraSmall]: size === 'extra-small',
        [classes.isSmall]: size === 'small',
        [classes.isMedium]: size === 'medium',
        [classes.isLarge]: size === 'large',
        [classes.isExtraLarge]: size === 'extra-large',
      })}
      component="div"
    />
  );
}

export const useStyles = makeStyles(
  theme => ({
    root: {
      width: theme.sizes.chartWidth.default,
      height: theme.sizes.chartWidth.default,

      '&$isExtraSmall': {
        width: theme.sizes.chartWidth.xs,
        height: theme.sizes.chartWidth.xs,
      },
      '&$isSmall': {
        width: theme.sizes.chartWidth.sm,
        height: theme.sizes.chartWidth.sm,
      },
      '&$isMedium': {
        width: theme.sizes.chartWidth.md,
        height: theme.sizes.chartWidth.md,
      },
      '&$isLarge': {
        width: theme.sizes.chartWidth.lg,
        height: theme.sizes.chartWidth.lg,
      },
      '&$isExtraLarge': {
        width: theme.sizes.chartWidth.xl,
        height: theme.sizes.chartWidth.xl,
      },
    },

    isExtraSmall: {},
    isSmall: {},
    isMedium: {},
    isLarge: {},
    isExtraLarge: {},
  }),
  { name: 'CompositionChartSkeleton' },
);
