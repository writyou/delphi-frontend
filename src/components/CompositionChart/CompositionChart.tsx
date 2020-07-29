import * as React from 'react';
import * as R from 'ramda';

import { Amount, Currency, Token, PercentAmount } from 'model/entities';
import { useTheme } from 'utils/styles';

import { PieChart } from '../PieChart/PieChart';
import { Component as NewTable, models as NewTableModels } from '../NewTable';
import { FormattedAmount } from '../FormattedAmount/FormattedAmount';
import { PieCurrency, ChartColor, PieSector } from './model';
import { useStyles } from './CompositionChart.style';
import { PoolTitle } from './PoolTitle';
import { SectorColorLabel } from './SectorColorLabel';

type Props<T extends Amount<Currency | Token>> = {
  chartData: PieCurrency<T>[];
  legendType?: 'simple' | 'table';
};

function CompositionChart<T extends Amount<Currency | Token>>({ chartData, legendType }: Props<T>) {
  const classes = useStyles();
  const theme = useTheme();

  const colors: ChartColor[] = React.useMemo(
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

  function getSectors() {
    const totalValue = R.pluck('value', chartData).reduce((total, current) => total.add(current));

    return chartData.map((pool, index) => {
      return {
        percent: new PercentAmount(totalValue.div(pool.value).mul(10)),
        label: pool.label,
        color: colors[index],
        value: pool.value,
      };
    });
  }

  const sortedData = React.useMemo(() => {
    const sortByValue = R.descend(R.prop('value'));
    return R.sort(sortByValue, getSectors());
  }, [chartData]);

  const renderLegend = React.useCallback(
    () => (
      <ul className={classes.legend}>
        {sortedData.map(({ label, percent, color }) => (
          <li className={classes.legendItem} key={label} style={{ color: color.label }}>
            <span className={classes.label}>
              {`${percent}`}&nbsp;{label}
            </span>
          </li>
        ))}
      </ul>
    ),
    [sortedData],
  );

  const renderTableLegend = React.useCallback(
    () => (
      <div className={classes.table}>
        <NewTable columns={columnForLegend} entries={sortedData} />
      </div>
    ),
    [sortedData],
  );

  return (
    <div className={classes.root}>
      <div className={classes.hidden}>{renderGradients()}</div>
      <div className={classes.chartContainer}>
        <div className={classes.chart}>
          <PieChart
            chartData={sortedData.map(sector => {
              return { value: sector.percent.toNumber(), label: sector.label };
            })}
            sectorColors={R.pluck('color', sortedData).map(chartColor => chartColor.sector)}
            startAngle={90}
            endAngle={-270}
            paddingAngle={5}
          />
        </div>
        {legendType && (legendType ? renderLegend() : renderTableLegend())}
      </div>
    </div>
  );
}

const columnForLegend: Array<NewTableModels.Column<PieSector<Amount<Currency | Token>>>> = [
  {
    cellContent: {
      kind: 'simple',
      render: x => <PoolTitle title={x.label} />,
    },
  },
  {
    cellContent: {
      kind: 'simple',
      render: x => (
        <SectorColorLabel
          title={<FormattedAmount sum={x.percent} variant="plain" />}
          color={x.color.label}
        />
      ),
    },
  },
  {
    cellContent: {
      kind: 'simple',
      render: x => <FormattedAmount sum={x.value} variant="plain" />,
    },
  },
];

export { CompositionChart };
