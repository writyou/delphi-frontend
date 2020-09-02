import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {},
    chartContainer: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
    },
    chart: {
      position: 'relative',
      width: theme.sizes.chartWidth.default,
      height: theme.sizes.chartWidth.default,

      '&$isUltraSmall': {
        width: theme.sizes.chartWidth.us,
        height: theme.sizes.chartWidth.us,
      },
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
    innerLegend: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    label: {
      color: theme.palette.text.primary,
    },
    hidden: {
      height: 0,
      width: 0,
      visibility: 'hidden',
      position: 'absolute',
      zIndex: -100,
    },

    isUltraSmall: {},
    isExtraSmall: {},
    isSmall: {},
    isMedium: {},
    isLarge: {},
    isExtraLarge: {},
  }),
  { name: 'CompositionChart' },
);
