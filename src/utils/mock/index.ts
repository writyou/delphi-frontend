import BN from 'bn.js';

import { Token, TokenAmount, LiquidityAmount, Currency, PercentAmount } from 'model/entities';
import { Fraction } from 'model/entities/Fraction';
import { PieChartData } from 'components';
import { SavingsPool } from 'model/types';

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
