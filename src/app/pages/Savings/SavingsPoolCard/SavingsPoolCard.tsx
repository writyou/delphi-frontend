import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { tKeys, useTranslate } from 'services/i18n';
import { LiquidityAmount } from 'model/entities';
import { Link, TokenIcon, FormattedAmount, Card } from 'components';
import { SavingsPool } from 'model/types';
import { liquidityAmount } from 'utils/mock';

import { useStyles } from './SavingsPoolCard.style';

type Props = {
  pool: SavingsPool;
  footerElement?: JSX.Element;
};

export function SavingsPoolCard({ pool: { devName, tokens }, footerElement }: Props) {
  const classes = useStyles();
  const liquidity: LiquidityAmount = liquidityAmount;
  const balance: LiquidityAmount = liquidityAmount;
  const { t } = useTranslate();
  return (
    <Card
      className={classes.root}
      variant="contained"
      label={devName}
      icons={tokens.map(x => (
        <div key={x.address} className={classes.token}>
          <TokenIcon className={classes.tokenIcon} diameter={30} tokenAddress={x.address} />
        </div>
      ))}
    >
      <div className={classes.content}>
        <div className={classes.row}>
          <span>{t(tKeys.modules.savings.mySupplyBalance.getKey())}</span>
          <span className={classes.balance}>
            <FormattedAmount sum={balance} variant="plain" />
          </span>
        </div>
        <div className={classes.row}>
          <span>{t(tKeys.modules.savings.poolLiquidity.getKey())}</span>
          <span>
            <FormattedAmount sum={liquidity} variant="plain" />
          </span>
        </div>
        {footerElement}
      </div>
    </Card>
  );
}

type ViewProps = {
  link: string;
  content: JSX.Element;
  additionalElement?: JSX.Element;
};

export function WithViewDetails({ link, content, additionalElement }: ViewProps) {
  const classes = useStyles();
  const { t } = useTranslate();
  return (
    <>
      <div className={classes.row}>
        {content}
        <Link
          component={RouterLink}
          to={link}
          color="textPrimary"
          title={t(tKeys.modules.savings.viewDetails.getKey())}
        >
          {t(tKeys.modules.savings.viewDetails.getKey())}
        </Link>
      </div>
      {additionalElement}
    </>
  );
}
