import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import cn from 'classnames';
import { Token } from '@akropolis-web/primitives';

import { tKeys, useTranslate } from 'services/i18n';

import { TokenIcon } from '../TokenIcon';
import { Card } from '../Card';
import { useStyles } from './PoolCard.style';

type Props = {
  poolName: string;
  tokens: Token[];
  isCardActive: boolean;
  content: Partial<{
    suppliedByUser: {
      content: JSX.Element;
      customTitle?: string;
    };
    poolLiquidity: {
      content: JSX.Element;
      customTitle?: string;
    };
    availableForDeposit?: JSX.Element;
    poolFilling?: JSX.Element;
    linkToMoreInfo: {
      to: string;
      disabled?: boolean;
    };
    actions?: {
      triggers: JSX.Element;
      content?: JSX.Element;
    };
  }>;
};

PoolCard.defaultProps = {
  content: {},
  isCardActive: false,
} as Partial<Props>;

export function PoolCard(props: Props) {
  const {
    poolName,
    tokens,
    isCardActive,
    content: {
      suppliedByUser,
      poolLiquidity,
      availableForDeposit,
      poolFilling,
      linkToMoreInfo,
      actions,
    },
  } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  return (
    <Card
      className={classes.root}
      variant="contained"
      label={poolName}
      isActive={isCardActive}
      icons={tokens.map(x => (
        <TokenIcon key={x.address} className={classes.tokenIcon} tokenAddress={x.address} />
      ))}
    >
      <div className={classes.content}>
        {suppliedByUser && (
          <div className={classes.row}>
            <span>
              {suppliedByUser.customTitle || t(tKeys.modules.savings.mySupplyBalance.getKey())}
            </span>
            <span className={classes.balance}>{suppliedByUser.content}</span>
          </div>
        )}
        {poolLiquidity && (
          <div className={classes.row}>
            <span>
              {poolLiquidity.customTitle || t(tKeys.modules.savings.poolLiquidity.getKey())}
            </span>
            <span>{poolLiquidity.content}</span>
          </div>
        )}

        {(poolFilling || availableForDeposit) && (
          <div className={cn(classes.row, classes.availableDepositRow)}>
            <Grid container justify="space-between" className={classes.root} spacing={1}>
              {poolFilling && (
                <Grid item xs={12}>
                  {poolFilling}
                </Grid>
              )}
              {availableForDeposit && (
                <Grid item xs={12}>
                  {availableForDeposit}
                </Grid>
              )}
            </Grid>
          </div>
        )}

        <div className={classes.row}>
          <Grid container justify="space-between">
            {actions?.triggers && <Grid item>{actions.triggers}</Grid>}
            {linkToMoreInfo && (
              <Grid item>
                <Link
                  className={cn(classes.link, { [classes.linkDisabled]: linkToMoreInfo.disabled })}
                  component={RouterLink}
                  to={linkToMoreInfo.to}
                  color="textPrimary"
                  title={t(tKeys.modules.savings.viewDetails.getKey())}
                >
                  {t(tKeys.modules.savings.viewDetails.getKey())}
                </Link>
              </Grid>
            )}
          </Grid>
        </div>
        {actions?.content && (
          <div className={cn(classes.row, classes.actionsRow)}>{actions.content}</div>
        )}
      </div>
    </Card>
  );
}
