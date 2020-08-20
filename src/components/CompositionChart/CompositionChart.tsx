import * as React from 'react';
import * as R from 'ramda';
import cn from 'classnames';
import { Amount } from '@akropolis-web/primitives';

import { PieChart } from '../PieChart/PieChart';
import { PieChartData, PieSector, Size } from './model';
import { useStyles } from './CompositionChart.style';
import { usePieSectors } from './usePieSectors';

type Props<T extends Amount, P = void> = {
  chartData: PieChartData<T, P>[];
  InnerLegend?: React.FC<{ sectors: PieSector<T, P>[] }>;
  size?: Size;
  withBackground?: boolean;
};

const innerRadiusBySize: Record<Size, string> = {
  'extra-small': '85%',
  small: '87%',
  medium: '89%',
  large: '91%',
  'extra-large': '93%',
};

export function CompositionChart<T extends Amount, P = void>({
  chartData,
  InnerLegend,
  size = 'large',
  withBackground,
}: Props<T, P>) {
  const classes = useStyles();

  const sectors = usePieSectors(chartData);

  return (
    <div className={classes.root}>
      <div>
        <svg className={classes.hidden}>{sectors.map(sector => sector.color.svgGradient)}</svg>
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
            withBackground={withBackground}
            chartData={sectors.map(sector => sector.percent.toNumber())}
            sectorColors={R.pluck('color', sectors).map(chartColor => chartColor.svgGradientID)}
            startAngle={90}
            endAngle={-270}
            paddingAngle={5}
            innerRadius={innerRadiusBySize[size]}
          />
        </div>
      </div>
    </div>
  );
}
