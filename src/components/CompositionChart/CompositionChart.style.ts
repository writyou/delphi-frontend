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
      position: 'relative',
      width: CHART_WIDTH,
      height: CHART_WIDTH,
    },
    innerLegend: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
