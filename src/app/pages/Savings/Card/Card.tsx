import React from 'react';

import { tKeys, useTranslate } from 'services/i18n';
import { Token, Amount } from 'model/entities';
import { Link, TokenIcon, FormattedAmount } from 'components';
import { ICurrency } from 'model/types';

import { useStyles } from './Card.style';

type Props = {
  title: string;
  tokens: Token[];
  balanceAmount: Amount<ICurrency>;
  liquidityAmount: Amount<ICurrency>;
  footerElement?: JSX.Element;
};

export function Card({ balanceAmount, liquidityAmount, footerElement, tokens, title }: Props) {
  const classes = useStyles();
  const { t } = useTranslate();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.cardName}>{title}</div>
        <div className={classes.tokens}>
          {tokens.map(x => (
            <div key={x.address} className={classes.token}>
              <TokenIcon className={classes.tokenIcon} diameter={30} tokenAddress={x.address} />
            </div>
          ))}
        </div>
      </div>
      <div className={classes.row}>
        <span>{t(tKeys.modules.savings.mySupplyBalance.getKey())}</span>
        <span className={classes.balance}>
          <FormattedAmount sum={balanceAmount} variant="plain" />
        </span>
      </div>
      <div className={classes.row}>
        <span>{t(tKeys.modules.savings.poolLiquidity.getKey())}</span>
        <span>
          <FormattedAmount sum={liquidityAmount} variant="plain" />
        </span>
      </div>
      {footerElement}
    </div>
  );
}

type ViewProps = {
  getLink: () => string;
  allocateSwitcher: JSX.Element;
  additionalElement?: JSX.Element;
};

export function WithViewDetails({ getLink, allocateSwitcher, additionalElement }: ViewProps) {
  const classes = useStyles();
  const { t } = useTranslate();
  return (
    <>
      <div className={classes.row}>
        {allocateSwitcher}
        <Link
          href={getLink()}
          color="textPrimary"
          target="_blank"
          rel="noopener noreferrer"
          title={t(tKeys.modules.savings.viewDetails.getKey())}
        >
          {t(tKeys.modules.savings.viewDetails.getKey())}
        </Link>
      </div>
      {additionalElement}
    </>
  );
}
