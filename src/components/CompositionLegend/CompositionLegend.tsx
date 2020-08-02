import * as React from 'react';

import { Amount } from 'model/entities';

import { PieChartData, PieSector } from '../CompositionChart/model';
import { usePieSectors } from '../CompositionChart/usePieSectors';

type Props<T extends Amount, P = void> = {
  chartData: PieChartData<T, P>[];
  Template: React.FC<{
    sectors: PieSector<T, P>[];
  }>;
};

export function CompositionLegend<T extends Amount, P = void>({
  chartData,
  Template,
}: Props<T, P>) {
  const sectors = usePieSectors(chartData);

  return <Template sectors={sectors} />;
}
