import * as React from 'react';
import { HiddenSvgDefs } from 'components/HiddenSvgDefs';

import { PieChart } from 'components/PieChart/PieChart';
import { useTheme } from 'utils/styles';

import { useStyles } from './ProgressChart.style';

type Props = {
  value: number;
  total: number;
  withLabels?: boolean;
  renderTitle?: () => {};
};

function ProgressChart(props: Props & Partial<React.ComponentProps<typeof PieChart>>) {
  const classes = useStyles();
  const theme = useTheme();

  const { value, total, withLabels, renderTitle, startAngle = 180, endAngle = 0, ...rest } = props;

  const chartData: number[] = React.useMemo(() => {
    return [value, total - value];
  }, [value, total]);

  return (
    <div className={classes.root}>
      <HiddenSvgDefs>
        {theme.gradients.progressChart.svgLinear('progressChartGradient')}
      </HiddenSvgDefs>
      <div className={classes.chart}>
        <PieChart
          {...rest}
          chartData={chartData}
          sectorColors={['url(#progressChartGradient)', 'transparent']}
          startAngle={startAngle}
          endAngle={endAngle}
          withBackground
        />
      </div>
      {renderTitle !== undefined && <div className={classes.title}>{renderTitle()}</div>}
    </div>
  );
}

export { ProgressChart };
