import * as React from 'react';
import * as R from 'ramda';

import { useTheme, makeStyles } from 'utils/styles';
import { CompositionChart, NewTable } from 'components';
import { TokenAmount, PercentAmount, Token } from 'model/entities';
import { Fraction } from 'model/entities/Fraction';

import * as tableData from './tableData';

export type PieSector = {
  value: number;
  label: string;
};

export type SectorColor = {
  sector: string;
  label: string;
};

type Props = {
  sectors: PieSector[];
};

const zeroAddress = '0x0000000000000000000000000000000000000000';

function getEntries(sectors: PieSector[], colors: SectorColor[]): tableData.Order[] {
  const sum: number = sectors.map(sector => sector.value).reduce((total, single) => total + single);
  return sectors.map((sector, index) => {
    return {
      label: sector.label,
      value: new TokenAmount(sector.value, new Token(zeroAddress, '', 10)),
      percent: new PercentAmount(new Fraction(sum / (sector.value * 100), '1')),
      labelColor: R.pluck('label', colors)[index],
    };
  });
}

function PoolPieChart(props: Props) {
  const { sectors } = props;
  const classes = useStyles();
  const theme = useTheme();

  const colors = React.useMemo(
    () =>
      theme.gradients.poolCompositionChart.map(({ points }, index) => ({
        sector: `url(#poolCompositionSector${index})`,
        label: R.last(points)!.color,
      })),
    [theme],
  );

  const renderGradients = React.useCallback(
    () => (
      <svg>
        {theme.gradients.poolCompositionChart.map((gradient, index) => (
          <React.Fragment key={index}>
            {gradient.svgLinear(`poolCompositionSector${index}`)}
          </React.Fragment>
        ))}
      </svg>
    ),
    [theme],
  );
  return (
    <div className={classes.root}>
      <div className={classes.hidden}>{renderGradients()}</div>
      <CompositionChart
        chartData={sectors}
        withoutLegend
        sectorColors={R.pluck('sector', colors)}
        labelColors={R.pluck('label', colors)}
      />
      <div className={classes.table}>
        <NewTable.Component
          columns={tableData.columnForLegend}
          entries={getEntries(sectors, colors)}
        />
      </div>
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
    },
  }),
  { name: 'PoolPieChart' },
);

export { PoolPieChart };
