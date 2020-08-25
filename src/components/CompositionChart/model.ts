import { Amount, PercentAmount, Fraction } from '@akropolis-web/primitives';

export type PieChartData<T extends Amount, P = void> = {
  value: T;
  payload: P;
};

export type ChartColor = {
  svgGradient: React.ReactElement;
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

export type Size = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
