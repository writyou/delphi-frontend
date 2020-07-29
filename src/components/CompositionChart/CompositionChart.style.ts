import { makeStyles } from 'utils/styles';

export const CHART_WIDTH = 135;

export const useStyles = makeStyles(
  theme => ({
    root: {},
    chartContainer: {
      marginTop: 25,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
    },
    chart: {
      width: CHART_WIDTH,
      height: CHART_WIDTH,
    },
    label: {
      color: theme.palette.text.primary,
    },
    hidden: {
      height: 0,
      visibility: 'hidden',
      width: 0,
      position: 'absolute',
      zIndex: -100,
    },
  }),
  { name: 'CompositionChart' },
);
