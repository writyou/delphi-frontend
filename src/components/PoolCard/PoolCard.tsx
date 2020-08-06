import React from 'react';
import { Observable } from 'rxjs';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { tKeys, useTranslate } from 'services/i18n';
import { Token, LiquidityAmount } from 'model/entities';
import { useSubscribable } from 'utils/react';

import { TokenIcon } from '../TokenIcon/TokenIcon';
import { Card } from '../Card/Card';
import { useStyles } from './PoolCard.style';

type Props = {
  address: string;
  poolName: string;
  tokens: Token[];
  link: string;
  content: JSX.Element;
  poolBalance: JSX.Element;
  poolLiquidity: JSX.Element;
  additionalElement?: JSX.Element;
  getPoolBalance(address: string): Observable<LiquidityAmount>;
};

export function PoolCard(props: Props) {
  const {
    link,
    content,
    additionalElement,
    address,
    poolName,
    tokens,
    poolBalance,
    poolLiquidity,
    getPoolBalance,
  } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  const [balance] = useSubscribable(() => getPoolBalance(address), [getPoolBalance, address]);

  return (
    <Card
      className={classes.root}
      variant="contained"
      label={poolName}
      isActive={balance && !balance.isZero()}
      icons={tokens.map(x => (
        <div key={x.address} className={classes.token}>
          <TokenIcon className={classes.tokenIcon} diameter={30} tokenAddress={x.address} />
        </div>
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
        <div className={classes.row}>
          <Grid container justify="space-between">
            <Grid item>{content}</Grid>
            <Grid item>
              <Link
                component={RouterLink}
                to={link}
                color="textPrimary"
                title={t(tKeys.modules.savings.viewDetails.getKey())}
              >
                {t(tKeys.modules.savings.viewDetails.getKey())}
              </Link>
            </Grid>
          </Grid>
        </div>
        {additionalElement}
      </div>
    </Card>
  );
}