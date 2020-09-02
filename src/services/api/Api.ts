import ApolloClient from 'apollo-client';
import { merge } from 'rxjs';

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
import { RewardsApi } from './modules/RewardsApi';
import { RENGateway } from './modules/RENGateway';

export class Api {
  private subgraphApi = new SubgraphApi(this.apolloClient);

  public web3Manager = new Web3Manager();
  public swarmApi = new SwarmApi();
  public prices = new PricesApi();
  public renGateway = new RENGateway(this.web3Manager);

  public transactions = new TransactionsApi();
  public erc20 = new Erc20Api(this.web3Manager, this.transactions);

  public savings = new SavingsModuleApi(
    this.web3Manager,
    this.transactions,
    this.erc20,
    this.subgraphApi,
  );

  public rewards = new RewardsApi(this.savings, this.prices);

  public staking = new StakingModuleApi(this.web3Manager, this.transactions, this.erc20);

  public dca = new DCAModuleApi();

  public user = new UserApi(
    this.web3Manager,
    this.subgraphApi,
    this.erc20,
    this.savings,
    this.dca,
    this.staking,
    this.rewards,
  );

  public globalStats = new GlobalStatsApi(
    this.subgraphApi,
    this.savings,
    this.staking,
    this.prices,
  );

  constructor(private apolloClient: ApolloClient<any>) {
    this.subgraphApi.setEventsForReloadUserSavingsPoolsGetter((a: string) =>
      this.savings.getDepositEvent$(a),
    );

    this.subgraphApi.setEventsForReloadUserGetter((a: string) =>
      merge(this.savings.getDepositEvent$(a), this.staking.getStakedEvent$(a)),
    );

    this.subgraphApi.setEventsForReloadSavingsPoolsGetter(this.savings.getProtocolRegisteredEvent$);
  }
}
