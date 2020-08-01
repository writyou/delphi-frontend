import { makeStyles } from 'utils/styles';

const CHART_WIDTH_EXTRA_SMALL = 55;
const CHART_WIDTH_SMALL = 80;
const CHART_WIDTH_MEDIUM = 100;
const CHART_WIDTH_LARGE = 135;
const CHART_WIDTH_EXTRA_LARGE = 155;

export const CHART_WIDTH = 135;

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
      width: CHART_WIDTH,
      height: CHART_WIDTH,

      '&$isExtraSmall': {
        width: CHART_WIDTH_EXTRA_SMALL,
        height: CHART_WIDTH_EXTRA_SMALL,
      },
      '&$isSmall': {
        width: CHART_WIDTH_SMALL,
        height: CHART_WIDTH_SMALL,
      },
      '&$isMedium': {
        width: CHART_WIDTH_MEDIUM,
        height: CHART_WIDTH_MEDIUM,
      },
      '&$isLarge': {
        width: CHART_WIDTH_LARGE,
        height: CHART_WIDTH_LARGE,
      },
      '&$isExtraLarge': {
        width: CHART_WIDTH_EXTRA_LARGE,
        height: CHART_WIDTH_EXTRA_LARGE,
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

    isExtraSmall: {},
    isSmall: {},
    isMedium: {},
    isLarge: {},
    isExtraLarge: {},
  }),
  { name: 'CompositionChart' },
);
