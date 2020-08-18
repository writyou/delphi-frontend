import { SavingsModuleApi } from './SavingsModuleApi';

export class RewardsApi {
  constructor(private savings: SavingsModuleApi) {}

  public getUserRewards$(userAddress: string) {
    return this.savings.getUserRewards$(userAddress);
  }
}
