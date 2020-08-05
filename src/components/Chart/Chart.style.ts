import { makeStyles } from 'utils/styles';

import { switchButtonsHeight } from './components/PeriodSwitch/PeriodSwitch.style';

export const useStyles = makeStyles(
  theme => {
    const graphicMarginBottom = 20;
    const graphicHeight = `calc(100% - ${graphicMarginBottom}px - ${switchButtonsHeight}px)`;

    return {
      root: {
        height: '100%',
        position: 'relative',
      },

      graphic: {
        height: graphicHeight,
        marginBottom: 14,
        opacity: 0,
      },

      tick: {
        fill: theme.palette.text.primary,
        fontSize: 10,
        fontWeight: 300,
        opacity: 0.5,
      },

      periodSwitch: {
        position: 'absolute',
        top: -45,
        right: 0,
      },
    };
  },
  { name: 'Chart' },
);
