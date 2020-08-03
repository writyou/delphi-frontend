import { Token, PercentAmount } from 'model/entities';
import * as SR from 'generated/gql/subgraphRequests';
import { SavingsPool } from 'model/types';
import { decimalsToWei } from 'utils/bn';
import { calcAvg } from 'utils/amounts';

export function convertSavingsPool(
  d: Pick<SR.SavingsPool, 'id'> & {
    poolToken: Pick<SR.Token, 'symbol' | 'id' | 'name' | 'decimals'>;
    tokens: Pick<SR.Token, 'symbol' | 'id' | 'decimals'>[];
    aprHistory: Pick<SR.SPoolApr, 'amount' | 'duration'>[];
  },
  aprDecimals: number,
): SavingsPool {
  return {
    address: d.id,
    poolName: poolNameByPoolTokenSymbol[d.poolToken.symbol] || d.poolToken.name,
    poolToken: new Token(d.poolToken.id, d.poolToken.symbol, d.poolToken.decimals),
    tokens: d.tokens.map(token => new Token(token.id, token.symbol, token.decimals)),
    apy: convertAPRHistoryToAvgAPR(d.aprHistory, aprDecimals),
  };
}

const poolNameByPoolTokenSymbol: Record<string, string> = {
  'ADST-CF-Y': 'Delphi CurveFi yPool',
  'ADST-COMP-DAI': 'Delphi Compound DAI',
};

export function convertUser(d: Pick<SR.User, 'id'>): User {
  return {
    address: d.id,
  };
}

function convertAPRHistoryToAvgAPR(
  d: Array<Pick<SR.SPoolApr, 'amount' | 'duration'>>,
  aprDecimals: number,
) {
  return new PercentAmount(
    calcAvg(...d.map(({ amount, duration }) => ({ value: amount, weight: duration })))
      .div(decimalsToWei(aprDecimals))
      .mul(100),
  );
}
