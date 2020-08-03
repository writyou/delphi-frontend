import { Token, TokenAmount, PercentAmount } from 'model/entities';

export type SavingsPool = {
  address: string;
  poolName: string;
  poolToken: Token;
  apy: PercentAmount;
  tokens: Token[];
};

export type DepositToSavingsPool = {
  poolAddress: string;
  amount: TokenAmount;
};

export type WithdrawFromSavingsPool = {
  poolAddress: string;
  amount: TokenAmount;
};
