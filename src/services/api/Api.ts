import ApolloClient from "apollo-client";

import { Web3Manager } from "./modules/Web3Manager";
import { Erc20Api } from "./modules/Erc20Api";
import { TransactionsApi } from "./modules/TransactionsApi";
import { SwarmApi } from "./modules/SwarmApi";
import { makeSubgraphApi } from "./modules/SubgraphApi";

export class Api {
  public web3Manager = new Web3Manager();
  public swarmApi = new SwarmApi();
  public subgraphApi = makeSubgraphApi(this.apolloClient);

  public transactions = new TransactionsApi();
  public erc20 = new Erc20Api(this.web3Manager, this.transactions);

  constructor(private apolloClient: ApolloClient<any>) {}
}
