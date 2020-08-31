import { Token, TokenAmount } from '@akropolis-web/primitives';

export type StakingPool = {
  address: string;
  poolName: string;
  token: Token;
};

export type WithdrawFromStakingPool = {
  poolAddress: string;
  amount: TokenAmount;
};

export type DepositToStakingPool = {
  poolAddress: string;
  amount: TokenAmount;
};
