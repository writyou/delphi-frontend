import * as React from 'react';
import * as R from 'ramda';

import { normalizeAmounts } from 'utils/amounts';
import { Amount, PercentAmount } from 'model/entities';
import { useTheme } from 'utils/styles';

import { PieChartData, ChartColor, PieSector } from './model';

export function usePieSectors<T extends Amount, P = void>(
  chartData: PieChartData<T, P>[],
): PieSector<T, P>[] {
  const theme = useTheme();

  const colors: ChartColor[] = React.useMemo(
    () =>
      theme.gradients.poolCompositionChart.map<ChartColor>((gradient, index) => ({
        rgb: R.last(gradient.points)!.color,
        svgGradientID: `url(#poolCompositionSector${index})`,
        svgGradient: (
          <React.Fragment key={index}>
            {gradient.svgLinear(`poolCompositionSector${index}`)}
          </React.Fragment>
        ),
      })),
    [theme],
  );

  const sectors = React.useMemo(() => {
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
  }, [chartData, colors]);

  const sortedSectors = React.useMemo(() => {
    const sortByValue = R.descend(R.prop('percent'));
    return R.sort(sortByValue, sectors);
  }, [sectors]);

  return sortedSectors;
}