import * as React from 'react';
import * as R from 'ramda';
import cn from 'classnames';

import { Amount, PercentAmount } from 'model/entities';
import { useTheme } from 'utils/styles';

import { PieChart } from '../PieChart/PieChart';
import { PieChartData, ChartColor, PieSector } from './model';
import { useStyles } from './CompositionChart.style';
import { normalizeAmounts } from './normalizeAmounts';

type Props<T extends Amount, P = void> = {
  chartData: PieChartData<T, P>[];
  Legend?: React.FC<{ sectors: PieSector<T, P>[] }>;
  InnerLegend?: React.FC<{ sectors: PieSector<T, P>[] }>;
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
};

function CompositionChart<T extends Amount, P = void>({
  chartData,
  Legend,
  InnerLegend,
  size = 'large',
}: Props<T, P>) {
  const classes = useStyles();
  const theme = useTheme();

  const colors: ChartColor[] = React.useMemo(
    () =>
      theme.gradients.poolCompositionChart.map<ChartColor>(({ points }, index) => ({
        svgGradientID: `url(#poolCompositionSector${index})`,
        rgb: R.last(points)!.color,
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

  function getSectors(): PieSector<T, P>[] {
    const normalizedData = normalizeAmounts(R.pluck('value', chartData));

    const totalValue = R.pluck('value', normalizedData).reduce((total, current) =>
      total.add(current),
    );

    return normalizedData.map((amount, index) => {
      return {
        percent: new PercentAmount(amount.value).div(totalValue).mul(100),
        color: colors[index],
        normalizedValue: amount.value,
        pieData: chartData[index],
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
          {InnerLegend && (
            <div className={classes.innerLegend}>
              <InnerLegend sectors={sortedData} />
            </div>
          )}
          <PieChart
            chartData={sortedData.map(sector => sector.percent.toNumber())}
            sectorColors={R.pluck('color', sortedData).map(chartColor => chartColor.svgGradientID)}
            startAngle={90}
            endAngle={-270}
            paddingAngle={5}
          />
        </div>
        {Legend && <Legend sectors={sortedData} />}
      </div>
    </div>
  );
}

export { CompositionChart };
