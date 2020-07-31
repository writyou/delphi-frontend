import { Amount, TokenAmount, Token } from 'model/entities';
import { decimalsToWei } from 'utils/bn';

export function denormolizeAmount<T extends Amount>(amount: T, token: Token): TokenAmount {
  const fractionAmount = amount.toFraction();

  return new TokenAmount(
    amount.currency.decimals > token.decimals
      ? fractionAmount.div(decimalsToWei(amount.currency.decimals - token.decimals))
      : fractionAmount.mul(decimalsToWei(token.decimals - amount.currency.decimals)),
    token,
  );
}
