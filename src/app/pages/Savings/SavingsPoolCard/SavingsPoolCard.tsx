import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { tKeys, useTranslate } from 'services/i18n';
import { Link, TokenIcon, Card } from 'components';
import { SavingsPool } from 'model/types';
import { SavingsPoolLiquidity, UserSavingsPoolBalance } from 'features/savingsPools';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

import { useStyles } from './SavingsPoolCard.style';

type Props = {
  pool: SavingsPool;
  footerElement?: JSX.Element;
};

export function SavingsPoolCard({ pool: { address, poolName, tokens }, footerElement }: Props) {
  const classes = useStyles();
  const { t } = useTranslate();

  const api = useApi();
  const [balance] = useSubscribable(() => api.user.getSavingsPoolBalance$(address), [api, address]);

  return (
    <Card
      className={classes.root}
      variant="contained"
      label={poolName}
      color={balance && !balance.isZero() ? 'active' : 'default'}
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
            <UserSavingsPoolBalance poolAddress={address} />
          </span>
        </div>
        <div className={classes.row}>
          <span>{t(tKeys.modules.savings.poolLiquidity.getKey())}</span>
          <span>
            <SavingsPoolLiquidity poolAddress={address} />
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
