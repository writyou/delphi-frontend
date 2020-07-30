import { Amount, PercentAmount } from 'model/entities';
import { Fraction } from 'model/entities/Fraction';

export type PieChartData<T extends Amount, P = void> = {
  value: T;
  payload: P;
};

export type ChartColor = {
  svgGradientID: string;
  rgb: string;
};

export type PieSector<T extends Amount, P = void> = {
  percent: PercentAmount;
  color: ChartColor;
  normalizedValue: Fraction;
  pieData: PieChartData<T, P>;
};

export type CompositionChartLegendProps<T extends Amount, P = void> = {
  sectors: PieSector<T, P>[];
};
