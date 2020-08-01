import * as React from 'react';
import * as R from 'ramda';
import cn from 'classnames';

import { Amount } from 'model/entities';

import { PieChart } from '../PieChart/PieChart';
import { PieChartData, PieSector } from './model';
import { useStyles } from './CompositionChart.style';
import { usePieSectors } from './usePieSectors';

type Props<T extends Amount, P = void> = {
  chartData: PieChartData<T, P>[];
  Legend?: React.FC<{ sectors: PieSector<T, P>[] }>;
  InnerLegend?: React.FC<{ sectors: PieSector<T, P>[] }>;
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
};

export function CompositionChart<T extends Amount, P = void>({
  chartData,
  Legend,
  InnerLegend,
  size = 'large',
}: Props<T, P>) {
  const classes = useStyles();

  const sectors = usePieSectors(chartData);

  return (
    <div className={classes.root}>
      <div className={classes.hidden}>
        <svg>{sectors.map(sector => sector.color.svgGradient)}</svg>
      </div>
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
              <InnerLegend sectors={sectors} />
            </div>
          )}
          <PieChart
            chartData={sectors.map(sector => sector.percent.toNumber())}
            sectorColors={R.pluck('color', sectors).map(chartColor => chartColor.svgGradientID)}
            startAngle={90}
            endAngle={-270}
            paddingAngle={5}
          />
        </div>
        {Legend && <Legend sectors={sectors} />}
      </div>
    </div>
  );
}
