import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { tKeys, useTranslate } from 'services/i18n';
import { Link, TokenIcon, FormattedAmount, Card, Loading } from 'components';
import { SavingsPool } from 'model/types';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';

import { useStyles } from './SavingsPoolCard.style';

type Props = {
  pool: SavingsPool;
  footerElement?: JSX.Element;
};

export function SavingsPoolCard({ pool: { address, devName, tokens }, footerElement }: Props) {
  const classes = useStyles();
  const api = useApi();
  const [balance, balanceMeta] = useSubscribable(() => api.user.getSavingsPoolBalance$(address), [
    api,
    address,
  ]);
  const [liquidity, liquidityMeta] = useSubscribable(() => api.savings.getPoolBalance$(address), [
    api,
    address,
  ]);
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
            <Loading meta={balanceMeta}>
              {balance && <FormattedAmount sum={balance} variant="plain" />}
            </Loading>
          </span>
        </div>
        <div className={classes.row}>
          <span>{t(tKeys.modules.savings.poolLiquidity.getKey())}</span>
          <span>
            <Loading meta={liquidityMeta}>
              {liquidity && <FormattedAmount sum={liquidity} variant="plain" />}
            </Loading>
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
