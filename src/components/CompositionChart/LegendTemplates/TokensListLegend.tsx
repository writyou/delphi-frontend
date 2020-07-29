import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { Amount, Currency, Token } from 'model/entities';

import { PieSector } from '../model';

export function TokensListLegend<T extends Amount<Currency | Token>>(chartData: PieSector<T>[]) {
  const classes = useStyles();

  return (
    <ul className={classes.legend}>
      {chartData.map(({ label, percent, color }) => (
        <li className={classes.legendItem} key={label} style={{ color: color.label }}>
          <span className={classes.label}>
            {`${percent}%`}&nbsp;{label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export const useStyles = makeStyles(
  theme => ({
    legend: {
      marginLeft: 23,
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
  { name: 'TokensListLegend' },
);
