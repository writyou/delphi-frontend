import React, { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { combineLatest, of } from 'rxjs';
import { TokenAmount } from '@akropolis-web/primitives';

import { makeStyles } from 'utils/styles';
import { useSubscribable } from 'utils/react';
import { tKeys, useTranslate } from 'services/i18n';
import { Typography, Link, Loading } from 'components';
import { useApi } from 'services/api';

import depositCat from '../images/deposit-cat.svg';
import { AmountsTable } from '../AmountsTable';

export type DepositDialogProps = {
  amounts: TokenAmount[];
  poolAddresses: string[];
  depositLink?: string;
  isStakingDeposit?: boolean;
  onClose: () => void;
};

const fKeys = tKeys.features.transactionFinalNotification;

export function DepositDialogTemplate({
  amounts,
  poolAddresses,
  isStakingDeposit,
  depositLink,
  onClose,
}: DepositDialogProps) {
  const api = useApi();
  const { t } = useTranslate();
  const classes = useStyles();
  const poolsRD = useSubscribable(
    poolAddresses && poolAddresses.length
      ? () =>
          combineLatest(
            poolAddresses.map(a =>
              isStakingDeposit ? api.staking.getPool$(a) : api.savings.getPool$(a),
            ),
          )
      : () => of(undefined),
    [api, poolAddresses, isStakingDeposit],
  );
  const handleLinkClick = useCallback(() => {
    onClose();
  }, []);

  return (
    <>
      <img className={classes.image} src={depositCat} alt="happy Delphic" />
      <Typography variant="h5" gutterBottom>
        {t(fKeys.deposit.title.getKey())}
      </Typography>
      <div className={classes.text}>{t(fKeys.deposit.textBeforeTokens.getKey())}</div>
      <AmountsTable amounts={amounts!} />
      <div className={classes.text}>
        {t(fKeys.deposit.textAfterTokens.getKey())}{' '}
        <Loading data={poolsRD}>
          {pools => (pools ? <>{pools.map(p => p?.poolName).join(', ')}</> : null)}
        </Loading>
        .
        <br />
        {t(fKeys.deposit.beforeLink.getKey())}{' '}
        {depositLink && (
          <Link<typeof RouterLink>
            color="textPrimary"
            component={RouterLink}
            onClick={handleLinkClick}
            to={depositLink}
          >
            {t(fKeys.deposit.link.getKey())}
          </Link>
        )}{' '}
        {t(fKeys.deposit.afterLink.getKey())}
      </div>
    </>
  );
}

const useStyles = makeStyles({
  image: {
    margin: '0 -30px',
  },
  text: {
    lineHeight: 1.5,
    fontSize: 16,
    margin: '20px 0',
    whiteSpace: 'pre-line',
  },
});
