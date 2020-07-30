import * as React from 'react';
import * as R from 'ramda';
import cn from 'classnames';

import { Amount, Currency, Token, PercentAmount } from 'model/entities';
import { useTheme } from 'utils/styles';

import { PieChart } from '../PieChart/PieChart';
import { PieCurrency, ChartColor, PieSector } from './model';
import { useStyles } from './CompositionChart.style';
import { normalizeAmounts } from './normalizeAmounts';

type Props<T extends Amount<Currency | Token>> = {
  chartData: PieCurrency<T>[];
  renderLegend?: (chartData: PieSector<T>[]) => React.ReactNode;
  renderInnerLegend?: (chartData?: PieSector<T>[]) => React.ReactNode;
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
};

function CompositionChart<T extends Amount<Currency | Token>>({
  chartData,
  renderLegend,
  renderInnerLegend,
  size = 'large',
}: Props<T>) {
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
    const normalizedData = normalizeAmounts(R.pluck('value', chartData));

    const totalValue = R.pluck('value', normalizedData).reduce((total, current) =>
      total.add(current),
    );

    return normalizedData.map((amount, index) => {
      return {
        percent: new PercentAmount(amount.value).div(totalValue).mul(100),
        label: chartData[index].label,
        color: colors[index],
        value: amount.value,
        originalValue: chartData[index].value,
      };
    });
  }

  const sectors = getSectors();

  const sortedData = React.useMemo(() => {
    const sortByValue = R.descend(R.prop('percent'));
    return R.sort(sortByValue, sectors);
  }, [sectors]);

  return (
    <div className={classes.root}>
      <div className={classes.hidden}>{renderGradients()}</div>
      <div className={classes.chartContainer}>
        <div
          className={cn(classes.chart, {
            [classes.isExtraSmall]: size === 'extra-small',
            [classes.isSmall]: size === 'small',
            [classes.isMedium]: size === 'medium',
            [classes.isLarge]: size === 'large',
            [classes.isExtraLarge]: size === 'extra-large',
          })}
        >
          {renderInnerLegend && (
            <div className={classes.innerLegend}>{renderInnerLegend(sortedData)}</div>
          )}
          <PieChart
            chartData={sortedData.map(sector => ({
              value: sector.percent.toNumber(),
              label: sector.label,
            }))}
            sectorColors={R.pluck('color', sortedData).map(chartColor => chartColor.sector)}
            startAngle={90}
            endAngle={-270}
            paddingAngle={5}
          />
        </div>
        {renderLegend && renderLegend(sortedData)}
      </div>
    </div>
  );
}

export { CompositionChart };
