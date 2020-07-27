import { Token } from 'model/entities';
import * as SR from 'generated/gql/subgraphRequests';
import { SavingsPool } from 'model/types';

export function convertSavingsPool(
  d: Pick<SR.SavingsPool, 'id'> & {
    poolToken: Pick<SR.Token, 'symbol' | 'id' | 'name' | 'decimals'>;
    tokens: Pick<SR.Token, 'symbol' | 'id' | 'decimals'>[];
  },
): SavingsPool {
  return {
    address: d.id,
    devName: d.poolToken.name,
    poolToken: new Token(d.poolToken.id, d.poolToken.symbol, d.poolToken.decimals),
    tokens: d.tokens.map(token => new Token(token.id, token.symbol, token.decimals)),
  };
}

export function convertUser(d: Pick<SR.User, 'id'>): User {
  return {
    address: d.id,
  };
}
