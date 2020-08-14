import ApolloClient from 'apollo-client';

import { Web3Manager } from './modules/Web3Manager';
import { Erc20Api } from './modules/Erc20Api';
import { TransactionsApi } from './modules/TransactionsApi';
import { SwarmApi } from './modules/SwarmApi';
import { SubgraphApi } from './modules/SubgraphApi';
import { SavingsModuleApi } from './modules/SavingsModuleApi';
import { UserApi } from './modules/UserApi';
import { GlobalStatsApi } from './modules/GlobalStatsApi';
import { DCAModuleApi } from './modules/DCAModuleApi';
import { StakingModuleApi } from './modules/StakingModuleApi';
import { PricesApi } from './modules/PriceApi';

export class Api {
  private subgraphApi = new SubgraphApi(this.apolloClient);

  public web3Manager = new Web3Manager();
  public swarmApi = new SwarmApi();
  public prices = new PricesApi();

  public transactions = new TransactionsApi();
  public erc20 = new Erc20Api(this.web3Manager, this.transactions);

  public savings = new SavingsModuleApi(
    this.web3Manager,
    this.transactions,
    this.erc20,
    this.subgraphApi,
  );

  public staking = new StakingModuleApi(this.web3Manager, this.transactions, this.erc20);

  public dca = new DCAModuleApi();

  public user = new UserApi(
    this.web3Manager,
    this.subgraphApi,
    this.erc20,
    this.savings,
    this.dca,
    this.staking,
  );

  public globalStats = new GlobalStatsApi(
    this.subgraphApi,
    this.savings,
    this.staking,
    this.prices,
  );

  constructor(private apolloClient: ApolloClient<any>) {
    this.subgraphApi.setGetDepositToSavingsPoolEvents(this.savings.makeGetDepositEvent());
  }
}
