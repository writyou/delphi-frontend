import { Token, TokenAmount } from 'model/entities';

export type SavingsPool = {
  address: string;
  devName: string;
  poolToken: Token;
  tokens: Token[];
};

export type DepositToSavingsPool = {
  poolAddress: string;
  amount: TokenAmount;
};
