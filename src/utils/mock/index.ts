import { Token, TokenAmount, LiquidityAmount, Currency, PercentAmount } from 'model/entities';
import { Fraction } from 'model/entities/Fraction';

export const zeroAddress = '0x0000000000000000000000000000000000000000';

export const tokenAmount = new TokenAmount(
  '2123123123123123123123',
  new Token(zeroAddress, 'MOCK', 18),
);

export const liquidityAmount = new LiquidityAmount('1123123123123123123123', new Currency('$', 18));

export const percentAmount = new PercentAmount(new Fraction('15555', '100000'));

export const mockedTokens: Token[] = [
  new Token('0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea', 'dai', 18),
  new Token('0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b', 'usdc', 6),
  new Token('0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02', 'usdt', 18),
];

// TODO move to another place, it is not mocks
export const ALL_TOKEN = new Token(zeroAddress, 'All Coins', 18);
export const DEFAULT_LIQUIDITY_CURRENCY = new Currency('$', 18);
