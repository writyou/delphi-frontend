import ApolloClient from 'apollo-client';

import { Web3Manager } from './modules/Web3Manager';
import { Erc20Api } from './modules/Erc20Api';
import { TransactionsApi } from './modules/TransactionsApi';
import { SwarmApi } from './modules/SwarmApi';
import { makeSubgraphApi } from './modules/SubgraphApi';
import { SavingsModuleApi } from './modules/SavingsModuleApi';
import { UserApi } from './modules/UserApi';

export class Api {
  public web3Manager = new Web3Manager();
  public swarmApi = new SwarmApi();
  public subgraphApi = makeSubgraphApi(this.apolloClient);

  public transactions = new TransactionsApi();
  public erc20 = new Erc20Api(this.web3Manager, this.transactions);

  public savings = new SavingsModuleApi(
    this.web3Manager,
    this.transactions,
    this.erc20,
    this.subgraphApi,
  );

  public user = new UserApi(this.web3Manager, this.erc20, this.subgraphApi);

  constructor(private apolloClient: ApolloClient<any>) {}
}
