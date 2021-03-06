import * as React from 'react';
import { Amount } from '@akropolis-web/primitives';

import { makeStyles } from 'utils/styles';

import { CompositionChartLegendProps, PieSector } from '../../CompositionChart/model';
import { roundPercentAmount } from './roundPercentAmount';

type Props<T extends Amount, P = void> = CompositionChartLegendProps<T, P> & {
  renderLabel?(sector: PieSector<T, P>): React.ReactNode;
};

export function SimpleLegend<T extends Amount, P = void>(props: Props<T, P>) {
  const { sectors, renderLabel } = props;
  const classes = useStyles();

  return (
    <ul className={classes.legend}>
      {sectors.map((sector, index) => (
        <li className={classes.legendItem} key={index} style={{ color: sector.color.rgb }}>
          <span className={classes.label}>
            {roundPercentAmount(sector.percent).toFormattedString()}&nbsp;
            {renderLabel && renderLabel(sector)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export const useStyles = makeStyles(
  theme => ({
    legend: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      fontSize: 13,
      fontWeight: 300,
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.primary.main,

      '&:before': {
        content: "''",
        width: 10,
        height: 10,
        marginRight: 10,
        flexShrink: 0,
        borderRadius: '50%',
        background: 'currentColor',
      },
    },
    label: {
      color: theme.palette.text.primary,
    },
  }),
  { name: 'SimpleLegend' },
);
