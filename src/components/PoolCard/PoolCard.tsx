import React from 'react';
import { Observable, empty } from 'rxjs';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import cn from 'classnames';
import { Token, Amount } from '@akropolis-web/primitives';

import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { Loading } from 'components/Loading';

import { TokenIcon } from '../TokenIcon/TokenIcon';
import { Card } from '../Card';
import { useStyles } from './PoolCard.style';
import { DepositLimit } from '../DepositLimit/DepositLimit';
import { PoolFillingLimit } from '../PoolFillingLimit/PoolFillingLimit';

type Props = {
  address: string;
  poolName: string;
  tokens: Token[];
  link?: string;
  isDisabledLink?: boolean;
  content: JSX.Element;
  poolBalance: JSX.Element;
  poolBalanceTitle?: string;
  poolLiquidity: JSX.Element;
  poolLiquidityTitle?: string;
  additionalElement?: JSX.Element;
  getDepositLimit$?(poolAddress: string): Observable<Amount | null>;
  getUserBalance$(poolAddress: string): Observable<Amount>;
};

export function PoolCard(props: Props) {
  const {
    link,
    content,
    isDisabledLink,
    additionalElement,
    address,
    poolName,
    tokens,
    poolBalance,
    poolBalanceTitle,
    poolLiquidity,
    poolLiquidityTitle,
    getDepositLimit$,
    getUserBalance$,
  } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  const [balance] = useSubscribable(() => getUserBalance$(address), [getUserBalance$, address]);
  const [depositLimit, depositLimitMeta] = useSubscribable(
    () => (getDepositLimit$ ? getDepositLimit$(address) : empty()),
    [getDepositLimit$, address],
  );

  return (
    <Card
      className={classes.root}
      variant="contained"
      label={poolName}
      isActive={balance && !balance.isZero()}
      icons={tokens.map(x => (
        <TokenIcon key={x.address} className={classes.tokenIcon} tokenAddress={x.address} />
      ))}
    >
      <div className={classes.content}>
        <div className={classes.row}>
          <span>{poolBalanceTitle || t(tKeys.modules.savings.mySupplyBalance.getKey())}</span>
          <span className={classes.balance}>{poolBalance}</span>
        </div>
        <div className={classes.row}>
          <span>{poolLiquidityTitle || t(tKeys.modules.savings.poolLiquidity.getKey())}</span>
          <span>{poolLiquidity}</span>
        </div>

        <div className={classes.row}>
          <PoolFillingLimit />
          <Loading meta={depositLimitMeta} progressProps={{ width: '100%' }}>
            {depositLimit && <DepositLimit limit={depositLimit} />}
          </Loading>
        </div>

        <div className={classes.row}>
          <Grid container justify="space-between">
            <Grid item>{content}</Grid>
            {link && (
              <Grid item>
                <Link
                  className={cn(classes.link, { [classes.linkDisabled]: isDisabledLink })}
                  component={RouterLink}
                  to={link}
                  color="textPrimary"
                  title={t(tKeys.modules.savings.viewDetails.getKey())}
                >
                  {t(tKeys.modules.savings.viewDetails.getKey())}
                </Link>
              </Grid>
            )}
          </Grid>
        </div>
        {additionalElement && (
          <div className={cn(classes.row, classes.additionalElementRow)}>{additionalElement}</div>
        )}
      </div>
    </Card>
  );
}
