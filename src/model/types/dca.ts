import { Token, PercentAmount, TokenAmount } from 'model/entities';

export type DCAPool = {
  address: string;
  poolName: string;
  poolToken: Token;
  apy: PercentAmount;
  tokens: Token[];
};

export type WithdrawFromDCAPool = {
  poolAddress: string;
  amount: TokenAmount;
};

export type DepositToDCAPool = {
  poolAddress: string;
  depositAmount: TokenAmount;
  weeklyAmount: any;
};

export type ChangeWeeklyDCAAmount = {
  poolAddress: string;
  weeklyAmount: any;
};
