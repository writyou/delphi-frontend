/* eslint-disable class-methods-use-this */
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as R from 'ramda';
import { Fraction, decimalsToWei } from '@akropolis-web/primitives';

import { memoize } from 'utils/decorators';
import { PRICE_LONG_POOLING_TIMEOUT } from 'env';

export class PricesApi {
  @memoize(R.identity)
  public getTokenPrice$(address: string): Observable<Fraction> {
    return timer(0, PRICE_LONG_POOLING_TIMEOUT).pipe(
      switchMap(() => getTokenPrice(address)),
      map(value => numberToFraction(value)),
    );
  }

  @memoize()
  public getEthereumPrice$(): Observable<Fraction> {
    return timer(0, PRICE_LONG_POOLING_TIMEOUT).pipe(
      switchMap(() => getEthereumPrice()),
      map(value => numberToFraction(value)),
    );
  }
}

function numberToFraction(value: number): Fraction {
  const fractionDigits = 20;
  const match = value.toFixed(fractionDigits).match(/^(\d+).?(\d*)$/);

  if (!match) {
    throw new Error('Invalid number');
  }

  const [, integer, fractional] = match;

  return new Fraction(integer).add(new Fraction(fractional).div(decimalsToWei(fractionDigits)));
}

async function getEthereumPrice(): Promise<number> {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`,
  );
  const json: {
    ethereum?: {
      usd?: number;
    };
  } = await response.json();
  const price = json?.ethereum?.usd || 0;

  return price;
}

async function getTokenPrice(address: string): Promise<number> {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve().then(() => 0.028);
  }

  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address.toLowerCase()}&vs_currencies=USD`,
  );
  const json: {
    [key in string]?: {
      usd?: number;
    };
  } = await response.json();
  const price = json?.[address.toLowerCase()]?.usd || 0;

  return price;
}
