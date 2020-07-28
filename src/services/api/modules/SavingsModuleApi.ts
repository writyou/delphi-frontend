import { autobind } from 'core-decorators';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { getCurrentValueOrThrow } from 'utils/rxjs';
import { DepositToSavingsPool } from 'model/types';
import { ETH_NETWORK_CONFIG } from 'env';
import { createSavingsModule } from 'generated/contracts';

import { Erc20Api } from './Erc20Api';
import { Contracts, Web3ManagerModule } from '../types';
import { SubgraphApi } from './SubgraphApi';
import { TransactionsApi } from './TransactionsApi';

export class SavingsModuleApi {
  // private readonlyContract: Contracts['savingsModule'];
  private txContract = new BehaviorSubject<null | Contracts['savingsModule']>(null);

  constructor(
    private web3Manager: Web3ManagerModule,
    private transactionsApi: TransactionsApi,
    private erc20: Erc20Api,
    private subgraph: SubgraphApi,
  ) {
    // this.readonlyContract = createSavingsModule(
    //   this.web3Manager.web3,
    //   ETH_NETWORK_CONFIG.contracts.savingsModule,
    // );

    this.web3Manager.txWeb3$
      .pipe(
        map(
          txWeb3 =>
            txWeb3 && createSavingsModule(txWeb3, ETH_NETWORK_CONFIG.contracts.savingsModule),
        ),
      )
      .subscribe(this.txContract);
  }

  public getPools$() {
    return this.subgraph.loadSavingsPools$();
  }

  public getPool$(address: string) {
    return this.subgraph.loadSavingsPool$(address);
  }

  @autobind
  public async deposit(deposits: DepositToSavingsPool[]): Promise<void> {
    const txContract = getCurrentValueOrThrow(this.txContract);
    const from = getCurrentValueOrThrow(this.web3Manager.account$);

    await this.erc20.approveMultiple(
      from,
      ETH_NETWORK_CONFIG.contracts.savingsModule,
      deposits.map(x => x.amount),
    );

    const promiEvent = txContract.methods.deposit(
      {
        _protocols: deposits.map(x => x.poolAddress),
        _tokens: deposits.map(x => x.amount.currency.address),
        _dnAmounts: deposits.map(x => x.amount.toBN()),
      },
      { from },
    );

    this.transactionsApi.pushToSubmittedTransactions('savings.deposit', promiEvent, {
      deposits,
      fromAddress: from,
    });

    await promiEvent;
  }
}
