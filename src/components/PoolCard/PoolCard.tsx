import React from 'react';
import { Observable } from 'rxjs';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import cn from 'classnames';

import { tKeys, useTranslate } from 'services/i18n';
import { Token, LiquidityAmount, Amount } from 'model/entities';
import { useSubscribable } from 'utils/react';

import { TokenIcon } from '../TokenIcon/TokenIcon';
import { Card } from '../Card/Card';
import { useStyles } from './PoolCard.style';

type Props = {
  address: string;
  poolName: string;
  tokens: Token[];
  link?: string;
  isDisabledLink?: boolean;
  content: JSX.Element;
  poolBalance: JSX.Element;
  poolLiquidity: JSX.Element;
  additionalElement?: JSX.Element;
  availableForDeposit: Amount;
  getUserBalance(address: string): Observable<LiquidityAmount>;
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
    poolLiquidity,
    availableForDeposit,
    getUserBalance,
  } = props;
  const classes = useStyles(props);
  const { t } = useTranslate();

  const [balance] = useSubscribable(() => getUserBalance(address), [getUserBalance, address]);

  return (
    <Card
      className={classes.root}
      variant="contained"
      label={poolName}
      isActive={balance && !balance.isZero()}
      icons={tokens.map(x => (
        <TokenIcon
          key={x.address}
          className={classes.tokenIcon}
          diameter={30}
          tokenAddress={x.address}
        />
      ))}
    >
      <div className={classes.content}>
        <div className={classes.row}>
          <span>{t(tKeys.modules.savings.mySupplyBalance.getKey())}</span>
          <span className={classes.balance}>{poolBalance}</span>
        </div>
        <div className={classes.row}>
          <span>{t(tKeys.modules.savings.poolLiquidity.getKey())}</span>
          <span>{poolLiquidity}</span>
        </div>
        <div className={cn(classes.row, classes.availableDepositRow)}>
          {availableForDeposit.isZero() ? (
            <>
              <span className={classes.circle} /> Not Available for deposit
            </>
          ) : (
            <>
              <span className={cn(classes.circle, classes.green)} />
              Available for deposit : {availableForDeposit.toFormattedString()}
            </>
          )}
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
        {additionalElement}
      </div>
    </Card>
  );
}
