import * as React from 'react';

import { makeStyles } from 'utils/styles';
import { CompositionChart, TokensTableLegend } from 'components';
import { TokenAmount, Token } from 'model/entities';

const zeroAddress = '0x0000000000000000000000000000000000000000';

const entries = [
  {
    value: new TokenAmount('1111111111111111111', new Token(zeroAddress, 'Mock', 18)),
    label: 'DAI',
  },
  {
    value: new TokenAmount('222222222222222222', new Token(zeroAddress, 'Mock', 18)),
    label: 'DAI',
  },
  {
    value: new TokenAmount('333333333333333333', new Token(zeroAddress, 'Mock', 18)),
    label: 'USDC',
  },
];

function PoolPieChart() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CompositionChart chartData={entries} renderLegend={TokensTableLegend} />
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
      padding: 10,
      display: 'flex',
      flexWrap: 'nowrap',
    },
    hidden: {
      height: 0,
      visibility: 'hidden',
      width: 0,
      position: 'absolute',
      zIndex: -100,
    },
    table: {
      marginLeft: 25,
      marginTop: 15,
    },
  }),
  { name: 'PoolPieChart' },
);

export { PoolPieChart };
