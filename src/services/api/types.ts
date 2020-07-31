import PromiEvent from 'web3/promiEvent';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';

import {
  createErc20,
  createSavingsModule,
  createDefiProtocol,
  createSavingsPoolToken,
} from 'generated/contracts';
import { TokenAmount } from 'model/entities';
import { DepositToSavingsPool } from 'model/types';

export type Contracts = {
  erc20: ReturnType<typeof createErc20>;
  savingsModule: ReturnType<typeof createSavingsModule>;
  savingsPoolToken: ReturnType<typeof createSavingsPoolToken>;
  defiProtocol: ReturnType<typeof createDefiProtocol>;
};

export type SubmittedTransaction =
  | IGenericSubmittedTransaction<
      'erc20.approve',
      { spender: string; fromAddress: string; value: TokenAmount }
    >
  | IGenericSubmittedTransaction<
      'savings.deposit',
      { deposits: DepositToSavingsPool[]; fromAddress: string }
    >;

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
  account$: BehaviorSubject<string | null>;
  txWeb3$: BehaviorSubject<Web3 | null>;
}
