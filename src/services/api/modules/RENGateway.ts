import { autobind } from 'core-decorators';
import type GatewayJS from '@renproject/gateway';

import { getCurrentValueOrThrow } from 'utils/rxjs';

import { Web3ManagerModule } from '../types';

export class RENGateway {
  private GatewayJS: typeof GatewayJS | null = null;
  private gateway: GatewayJS | null = null;

  constructor(private web3Manager: Web3ManagerModule) {}

  private async getGetaway(): Promise<{ gateway: GatewayJS; lib: typeof GatewayJS }> {
    if (!this.GatewayJS || !this.gateway) {
      this.GatewayJS = (await import('@renproject/gateway')).default;
      this.gateway = new this.GatewayJS('testnet'); // TODO
    }

    return { gateway: this.gateway, lib: this.GatewayJS };
  }

  @autobind
  public async openWidget(): Promise<void> {
    const txWeb3 = getCurrentValueOrThrow(this.web3Manager.txWeb3$);
    const { gateway, lib } = await this.getGetaway();

    gateway.open({
      sendToken: lib.Tokens.BTC.Btc2Eth,
      web3Provider: txWeb3.currentProvider,
    });
  }
}
