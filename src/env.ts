import { getEnv, Mode } from 'core/getEnv';
import { zeroAddress } from 'utils/mock';

export type NetworkID = 1 | 4;

interface INetworkConfig {
  id: NetworkID;
  name: 'mainnet' | 'rinkeby';
  contracts: {
    savingsModule: string;
  };
  tokens: {
    dai: string;
    usdc: string;
    usdt: string;
    tusd: string;
  };
  etherskanDomain: string;
}

const ethNetworkConfigTestnet: INetworkConfig = {
  id: 4,
  name: 'rinkeby',
  contracts: {
    savingsModule: zeroAddress,
  },
  tokens: {
    dai: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
    usdc: '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b',
    usdt: '0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02',
    tusd: 'tusd',
  },
  etherskanDomain: 'https://rinkeby.etherscan.io/',
};

const ethNetworkConfigsForSandbox: INetworkConfig = {
  id: 4,
  name: 'rinkeby',
  contracts: {
    savingsModule: '0x2C6c379F44e9e929F206D115C9d1cd9c2be41562',
  },
  tokens: {
    dai: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
    usdc: '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b',
    usdt: '0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02',
    tusd: 'tusd',
  },
  etherskanDomain: 'https://rinkeby.etherscan.io/',
};

const ethNetworkConfigsForMainnet: INetworkConfig = {
  id: 1,
  name: 'mainnet',
  contracts: {
    savingsModule: zeroAddress,
  },
  tokens: { dai: 'dai', usdc: 'usdc', usdt: 'usdt', tusd: 'tusd' },
  etherskanDomain: 'https://etherscan.io/',
};

const configsByMode: Record<Mode, INetworkConfig> = {
  testnet: ethNetworkConfigTestnet,
  sandbox: ethNetworkConfigsForSandbox,
  mainnet: ethNetworkConfigsForMainnet,
};

// eslint-disable-next-line no-nested-ternary
export const ETH_NETWORK_CONFIG = configsByMode[getEnv().mode];
export const NETWORK_ID: NetworkID = ETH_NETWORK_CONFIG.id;
export const SWARM_GATEWAY_URL = 'https://swarm-gateways.net';
// TODO take from contract
export const LONG_POOLING_TIMEOUT = 5 * 1000;

const subgraphHttpUrlsByMode: Record<Mode, string> = {
  testnet: 'https://api.thegraph.com/subgraphs/name/in19farkt/delphi-rinkeby',
  sandbox: 'https://api.thegraph.com/subgraphs/name/in19farkt/delphi-sandbox',
  mainnet: 'https://api.thegraph.com/subgraphs/name/in19farkt/delphi-mainnet',
};

const subgraphWsUrlsByMode: Record<Mode, string> = {
  testnet: 'wss://api.thegraph.com/subgraphs/name/in19farkt/delphi-rinkeby',
  sandbox: 'wss://api.thegraph.com/subgraphs/name/in19farkt/delphi-sandbox',
  mainnet: 'wss://api.thegraph.com/subgraphs/name/in19farkt/delphi-mainnet',
};

export const SUBGRAPH_HTTP_URL = subgraphHttpUrlsByMode[getEnv().mode];
export const SUBGRAPH_WS_URL = subgraphWsUrlsByMode[getEnv().mode];