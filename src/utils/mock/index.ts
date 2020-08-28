import BN from 'bn.js';
import {
  Token,
  TokenAmount,
  LiquidityAmount,
  Currency,
  PercentAmount,
  Fraction,
} from '@akropolis-web/primitives';

import { PieChartData } from 'components';
import { SavingsPool } from 'model/types';
import { SubmittedTransaction } from 'services/api';

export const zeroAddress = '0x0000000000000000000000000000000000000000';

export const tokenAmount = new TokenAmount('0', new Token(zeroAddress, 'MOCK', 18));

export const liquidityAmount = new LiquidityAmount('0', new Currency('$', 18));

export const percentAmount = new PercentAmount(new Fraction('0'));

export const mockedTokens: Token[] = [
  new Token('0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea', 'MOCK', 18),
  new Token('0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b', 'MOCK', 6),
  new Token('0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02', 'MOCK', 18),
];

export const mockedTokenAmounts: TokenAmount[] = mockedTokens.map(
  token => new TokenAmount(0, token),
);

export const getMockCompositionChartEntriesToken = (number: number): PieChartData<TokenAmount>[] =>
  new Array<number>(number).fill(0).map((_, index) => ({
    value: new TokenAmount(`${index + 1}634870000000000000000000`, mockedTokens[0]),
    payload: undefined,
  }));

export const getMockCompositionChartEntriesLiquidity = (
  number: number,
): PieChartData<LiquidityAmount, SavingsPool>[] =>
  new Array<number>(number).fill(0).map((_, index) => ({
    value: new LiquidityAmount(new BN(20 * (index + 1)), new Currency('$', 18)),
    payload: {
      address: zeroAddress,
      poolName: 'MOCK',
      poolToken: tokenAmount.currency,
      apy: percentAmount,
      tokens: [],
    },
  }));

// TODO move to another place, it is not mocks
export const ALL_TOKEN = new Token(zeroAddress, 'All Coins', 18);
export const DEFAULT_LIQUIDITY_CURRENCY = new Currency('$', 18);

export const mockedTransactions: Record<
  'savings.withdraw' | 'savings.deposit' | 'rewards.withdraw',
  SubmittedTransaction
> = {
  'savings.withdraw': {
    type: 'savings.withdraw',
    payload: { withdraw: { poolAddress: '123', amount: tokenAmount }, fromAddress: zeroAddress },
    tx: new Promise(r => r('12345')),
    promiEvent: {} as any,
  },
  'savings.deposit': {
    type: 'savings.deposit',
    payload: {
      deposits: [
        {
          amount: new TokenAmount(
            '12300000000',
            new Token('0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea', 'MOCKKKK', 18),
          ),
          poolAddress: '0x048e645ba2965f48d72e7b855d6636f951aed303',
        },
        {
          amount: new TokenAmount('23400000', mockedTokens[1]),
          poolAddress: '0x3a52c1bb8651d8a73ebf9e569ae5fe9b558fcde1',
        },
        {
          amount: new TokenAmount('45600000000000000000000', mockedTokens[2]),
          poolAddress: '0x853d71180e6ba6584f3d400b21e4aee2463129a4',
        },
      ],
      fromAddress: zeroAddress,
    },
    tx: new Promise(r => r('12345')),
    promiEvent: {} as any,
  },
  'rewards.withdraw': {
    type: 'rewards.withdraw',
    payload: { amounts: [tokenAmount], fromAddress: zeroAddress },
    tx: new Promise(r => r('12345')),
    promiEvent: {} as any,
  },
};
