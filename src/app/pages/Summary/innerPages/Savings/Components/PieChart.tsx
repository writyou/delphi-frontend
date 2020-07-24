import * as React from 'react';
import * as R from 'ramda';

import { useTheme, makeStyles } from 'utils/styles';
import { mockSectors } from 'utils/mock';
import { CompositionChart } from 'components';

function PieChart() {
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
        chartData={mockSectors}
        sectorColors={R.pluck('sector', colors)}
        labelColors={R.pluck('label', colors)}
      />
    </div>
  );
}

const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
      padding: 10,
    },
    hidden: {
      height: 0,
      visibility: 'hidden',
      width: 0,
      position: 'absolute',
      zIndex: -100,
    },
  }),
  { name: 'PieChart' },
);

export { PieChart };
