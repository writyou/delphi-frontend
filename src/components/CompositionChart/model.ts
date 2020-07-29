import { Amount, Currency, Token, PercentAmount } from 'model/entities';

export type PieCurrency<T extends Amount<Currency | Token>> = {
  value: T;
  label: string;
};

export type ChartColor = {
  sector: string;
  label: string;
};

export type PieSector<T extends Amount<Currency | Token>> = {
  percent: PercentAmount;
  label: string;
  color: ChartColor;
  value: T;
};
