import { getEnv, Mode } from 'core/getEnv';

export type NetworkID = 1 | 4;

const zeroAddress = '0x0000000000000000000000000000000000000000';

interface INetworkConfig {
  id: NetworkID;
  name: 'mainnet' | 'rinkeby';
  contracts: {
    savingsModule: string;
    akroStakingPool: string;
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
    AKRO: string;
    WETH: string;
    ADEL: string;
    COMP: string;
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
  AKRO: `0xad7541B1E795656851caD5c70aA8d495063D9a95`,
  WETH: `${zeroAddress.slice(-1)}1`,
  COMP: '0x82395c65e12aacb49981ae21d6e2a00c2ad70591',
  ADEL: `${zeroAddress.slice(-1)}2`,
};

const ethNetworkConfigTestnet: INetworkConfig = {
  id: 4,
  name: 'rinkeby',
  contracts: {
    savingsModule: '0xb733994019A4F55CAa3f130400B7978Cc6624c39',
    akroStakingPool: '0x6887DF2f4296e8B772cb19479472A16E836dB9e0',
  },
  tokens: testnetTokens,
  etherskanDomain: 'https://rinkeby.etherscan.io/',
};

const ethNetworkConfigsForSandbox: INetworkConfig = {
  id: 4,
  name: 'rinkeby',
  contracts: {
    savingsModule: '0xb733994019A4F55CAa3f130400B7978Cc6624c39',
    akroStakingPool: '0x6887DF2f4296e8B772cb19479472A16E836dB9e0',
  },
  tokens: testnetTokens,
  etherskanDomain: 'https://rinkeby.etherscan.io/',
};

const ethNetworkConfigsForMainnet: INetworkConfig = {
  id: 1,
  name: 'mainnet',
  contracts: {
    savingsModule: '0x73fC3038B4cD8FfD07482b92a52Ea806505e5748',
    akroStakingPool: '0x3501Ec11d205fa249f2C42f5470e137b529b35D0',
  },
  tokens: {
    DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
    USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    USDT: testnetTokens.USDT,
    TUSD: testnetTokens.TUSD,
    sUSD: testnetTokens.sUSD,
    renBTC: testnetTokens.renBTC,
    WBTC: testnetTokens.WBTC,
    sBTC: testnetTokens.sBTC,
    AKRO: '0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7',
    WETH: testnetTokens.WETH,
    COMP: testnetTokens.COMP,
    ADEL: testnetTokens.ADEL,
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

export const PRICE_LONG_POOLING_TIMEOUT = 15 * 60 * 1000;
export const WEB3_LONG_POOLING_TIMEOUT = 30 * 1000;
export const SIGNIFICANT_FRACTIONAL_DIGITS = 8;

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

export const DISCORD_URL = 'https://discord.gg/Y58CGUW';
export const PREAUDIT_VERSION_ANNOUNCEMENT_URL = '#';
