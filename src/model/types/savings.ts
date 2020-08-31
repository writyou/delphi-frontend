import { Token, TokenAmount, PercentAmount } from '@akropolis-web/primitives';

export type SavingsPool = {
  address: string;
  poolName: string;
  poolToken: Token;
  apy: PercentAmount;
  tokens: Token[];
};

export type Reward = {
  amount: TokenAmount;
};

export type DepositToSavingsPool = {
  poolAddress: string;
  amount: TokenAmount;
};

export type WithdrawFromSavingsPool = {
  poolAddress: string;
  amount: TokenAmount;
};
