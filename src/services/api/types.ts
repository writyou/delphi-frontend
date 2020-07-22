import PromiEvent from 'web3/promiEvent';
import BN from 'bn.js';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';

import {
  createErc20,
  createFundsModule,
  createDeFiModule,
  createLiquidityModule,
  createLoanModule,
  createCurveModule,
  createPToken,
  createLoanLimitsModule,
  createLoanProposalsModule,
} from 'generated/contracts';
import { TokenAmount, LiquidityAmount } from 'model/entities';

export type Contracts = {
  erc20: ReturnType<typeof createErc20>;
  ptk: ReturnType<typeof createPToken>;
  fundsModule: ReturnType<typeof createFundsModule>;
  liquidityModule: ReturnType<typeof createLiquidityModule>;
  loanModule: ReturnType<typeof createLoanModule>;
  loanLimitsModule: ReturnType<typeof createLoanLimitsModule>;
  loanProposalsModule: ReturnType<typeof createLoanProposalsModule>;
  curveModule: ReturnType<typeof createCurveModule>;
  defiModule: ReturnType<typeof createDeFiModule>;
};

export type SubmittedTransaction =
  | IGenericSubmittedTransaction<'ptk.claimDistributions', { fromAddress: string }>
  | IGenericSubmittedTransaction<
      'erc20.approve',
      { spender: string; fromAddress: string; value: TokenAmount }
    >
  | IGenericSubmittedTransaction<
      'liquidity.sellPtk',
      { address: string; sourceAmount: TokenAmount }
    >
  | IGenericSubmittedTransaction<'liquidity.buyPtk', { address: string; sourceAmount: TokenAmount }>
  | IGenericSubmittedTransaction<'defi.withdrawInterest', { address: string }>
  | IGenericSubmittedTransaction<
      'loan.addPledge',
      { address: string; sourceAmount: LiquidityAmount }
    >
  | IGenericSubmittedTransaction<
      'loan.unstakePledge',
      { address: string; sourceAmount: LiquidityAmount }
    >
  | IGenericSubmittedTransaction<
      'loan.withdrawUnlockedPledge',
      { address: string; borrower: string; debtId: string }
    >
  | IGenericSubmittedTransaction<
      'loan.createProposal',
      { address: string; sourceAmount: TokenAmount; apr: string; description: string }
    >
  | IGenericSubmittedTransaction<'loan.executeProposal', { address: string; proposalId: string }>
  | IGenericSubmittedTransaction<'loan.cancelProposal', { address: string; proposalId: string }>
  | IGenericSubmittedTransaction<
      'loan.liquidateDebt',
      { address: string; borrower: string; debtId: string }
    >
  | IGenericSubmittedTransaction<'loan.repay', { address: string; debtId: string; amount: BN }>;

export interface IGenericSubmittedTransaction<T extends string, P = void> {
  type: T;
  payload: P;
  tx: Promise<string>;
  promiEvent: PromiEvent<boolean>;
}

export type SubmittedTransactionType = SubmittedTransaction['type'];

export type ExtractSubmittedTransaction<T extends SubmittedTransactionType> = Extract<
  SubmittedTransaction,
  IGenericSubmittedTransaction<T, any>
>;

export interface Web3ManagerModule {
  web3: Web3;
  txWeb3: BehaviorSubject<Web3 | null>;
}
