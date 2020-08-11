import { Token, TokenAmount } from 'model/entities';

export type StakingPool = {
  address: string;
  poolName: string;
  token: Token;
};

export type WithdrawFromStakingPool = {
  poolAddress: string;
};

export type DepositToStakingPool = {
  poolAddress: string;
  amount: TokenAmount;
};
