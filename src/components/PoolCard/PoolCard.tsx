import React from 'react';
import { combineLatest, Observable, of } from 'rxjs';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import cn from 'classnames';
import { Token, Amount } from '@akropolis-web/primitives';
import { map } from 'rxjs/operators';

import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribableDeprecated } from 'utils/react';

import { DeprecatedLoading } from '../DeprecatedLoading';
import { DepositLimit } from '../DepositLimit/DepositLimit';
import { TokenIcon } from '../TokenIcon';
import { Card } from '../Card';
import { PoolFillingLimit } from '../PoolFillingLimit/PoolFillingLimit';
import { useStyles } from './PoolCard.style';

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
  getPoolCapacity$?(poolAddress: string): Observable<Amount | null>;
  getPoolBalance$?(poolAddress: string): Observable<Amount>;
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
    poolBalance: poolBalanceElement,
    poolBalanceTitle,
    poolLiquidity,
    poolLiquidityTitle,
    getDepositLimit$,
    getPoolBalance$,
    getPoolCapacity$,
    getUserBalance$,
  } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  const [balance] = useSubscribableDeprecated(() => getUserBalance$(address), [
    getUserBalance$,
    address,
  ]);
  const [availableForDeposit, availableForDepositMeta] = useSubscribableDeprecated(
    () => (getDepositLimit$ ? getDepositLimit$(address) : of(null)),
    [getDepositLimit$, address],
  );
  const [poolFilling, poolFillingMeta] = useSubscribableDeprecated(
    () =>
      getDepositLimit$ && getPoolBalance$ && getPoolCapacity$
        ? combineLatest([getPoolBalance$(address), getPoolCapacity$(address)]).pipe(
            map(([poolBalance, poolCapacity]) => ({
              poolBalance,
              poolCapacity,
            })),
          )
        : of(null),
    [getPoolBalance$, getPoolCapacity$, address],
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
          <span className={classes.balance}>{poolBalanceElement}</span>
        </div>
        <div className={classes.row}>
          <span>{poolLiquidityTitle || t(tKeys.modules.savings.poolLiquidity.getKey())}</span>
          <span>{poolLiquidity}</span>
        </div>

        <div className={cn(classes.row, classes.availableDepositRow)}>
          <DeprecatedLoading
            meta={[availableForDepositMeta, poolFillingMeta]}
            progressProps={{ width: '100%' }}
          >
            {(availableForDeposit || poolFilling) && (
              <Grid container justify="space-between" className={classes.root} spacing={1}>
                {poolFilling && poolFilling.poolCapacity && (
                  <Grid item xs={12}>
                    <PoolFillingLimit
                      capacity={poolFilling.poolCapacity}
                      filled={poolFilling.poolBalance}
                    />
                  </Grid>
                )}
                {availableForDeposit && (
                  <Grid item xs={12}>
                    <DepositLimit limit={availableForDeposit} />
                  </Grid>
                )}
              </Grid>
            )}
          </DeprecatedLoading>
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
