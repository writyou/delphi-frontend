import { Token, PercentAmount, TokenAmount } from 'model/entities';

export type DCAPool = {
  address: string;
  poolName: string;
  apy: PercentAmount;
  tokens: Token[];
  tokenToSell: Token;
};

export type WithdrawFromDCAPool = {
  poolAddress: string;
  amount: TokenAmount;
};

export type DepositToDCAPool = {
  poolAddress: string;
  depositAmount: TokenAmount;
  weeklyAmount: TokenAmount;
};

export type ChangeWeeklyDCAAmount = {
  poolAddress: string;
  weeklyAmount: TokenAmount;
};
