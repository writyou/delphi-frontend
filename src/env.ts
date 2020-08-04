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
    DAI: string;
    USDC: string;
    USDT: string;
    TUSD: string;
    sUSD: string;
    renBTC: string;
    WBTC: string;
    sBTC: string;
  };
  etherskanDomain: string;
}

const testnetTokens: INetworkConfig['tokens'] = {
  DAI: `0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa`,
  USDC: `0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b`,
  USDT: `0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02`,
  TUSD: `0xe7dB8abd6e2c15a39C4AA15A136E48F9B7f8F1d0`,
  sUSD: `0x15129620e32336438B396ce3825BcDc8Cef4B8eB`,
  renBTC: `0xE09fac962aA9BCf5c21B1987396c8A7C16C82B11`,
  WBTC: `0xEBa449b9150F34396D529643263A90D495Ae563c`,
  sBTC: `0x4Bd89B14F55A6Ef852A938Ccc0181F39E87E80C5`,
};

const ethNetworkConfigTestnet: INetworkConfig = {
  id: 4,
  name: 'rinkeby',
  contracts: {
    savingsModule: '0x2C6c379F44e9e929F206D115C9d1cd9c2be41562',
  },
  tokens: testnetTokens,
  etherskanDomain: 'https://rinkeby.etherscan.io/',
};

const ethNetworkConfigsForSandbox: INetworkConfig = {
  id: 4,
  name: 'rinkeby',
  contracts: {
    savingsModule: '0x2C6c379F44e9e929F206D115C9d1cd9c2be41562',
  },
  tokens: testnetTokens,
  etherskanDomain: 'https://rinkeby.etherscan.io/',
};

const ethNetworkConfigsForMainnet: INetworkConfig = {
  id: 1,
  name: 'mainnet',
  contracts: {
    savingsModule: zeroAddress,
  },
  tokens: {
    DAI: zeroAddress,
    USDC: zeroAddress,
    USDT: zeroAddress,
    TUSD: zeroAddress,
    sUSD: zeroAddress,
    renBTC: zeroAddress,
    WBTC: zeroAddress,
    sBTC: zeroAddress,
  },
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
