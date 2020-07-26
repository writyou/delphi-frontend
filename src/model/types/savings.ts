import { Token } from 'model/entities';

export type SavingsPool = {
  address: string;
  devName: string;
  poolToken: Token;
  tokens: Token[];
};
