/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { TokenAmount } from '@akropolis-web/primitives';
import { of, combineLatest } from 'rxjs';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from 'utils/styles';
import { useSubscribable } from 'utils/react';
import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { Typography, Loading, Grid, TokenName, FormattedAmount, Link } from 'components';

import withdrawCat from './withdraw-cat.svg';
import depositCat from './deposit-cat.svg';
import errorCat from './error-cat.svg';

export type Variant = 'withdraw' | 'deposit' | 'errorWithdraw' | 'errorDeposit';

export type Payload = {
  amounts?: TokenAmount[];
  poolAddresses?: string[];
  wallet?: string;
  isStakingDeposit?: boolean;
  depositLink?: string;
};

type TemplateProps = Payload & {
  withdrawLink?: string;
  variant: Variant;
  onClose: () => void;
};
const fKeys = tKeys.features.transactionFinalNotification;

export function DialogContentTemplate({
  amounts,
  poolAddresses,
  isStakingDeposit,
  withdrawLink,
  depositLink,
  wallet,
  variant,
  onClose,
}: TemplateProps) {
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

  if (variant === 'errorDeposit') {
    return (
      <>
        <img className={classes.image} src={errorCat} alt="sad Delphic" />
        <Typography variant="h5" gutterBottom>
          {t(fKeys.depositError.title.getKey())}
        </Typography>
        <div className={classes.text}>{t(fKeys.depositError.text.getKey())}</div>
        <div className={classes.text}>{t(fKeys.depositError.problems.getKey())}</div>
      </>
    );
  }
  if (variant === 'errorWithdraw') {
    return (
      <>
        <img className={classes.image} src={errorCat} alt="sad Delphic" />
        <Typography variant="h5" gutterBottom>
          {t(fKeys.withdrawError.title.getKey())}
        </Typography>
        <div className={classes.text}>{t(fKeys.withdrawError.text.getKey())}</div>
        <div className={classes.text}>{t(fKeys.withdrawError.problems.getKey())}</div>
      </>
    );
  }
  if (variant === 'withdraw') {
    return (
      <>
        <img className={classes.image} src={withdrawCat} alt="happy Delphic" />
        <Typography variant="h5" gutterBottom>
          {t(fKeys.withdraw.title.getKey())}
        </Typography>
        <div className={classes.text}>{t(fKeys.withdraw.textBeforeTokens.getKey())}</div>
        <Table amounts={amounts!} />
        <div className={classes.text}>
          {t(fKeys.withdraw.textAfterTokens.getKey())}
          <br />
          {wallet}
          <br />
          {t(fKeys.withdraw.beforeLink.getKey())}{' '}
          <Link color="textPrimary" href={withdrawLink} target="_blank" rel="noopener noreferrer">
            {t(fKeys.withdraw.link.getKey())}
          </Link>
          {t(fKeys.withdraw.afterLink.getKey())}
        </div>
      </>
    );
  }
  if (variant === 'deposit') {
    return (
      <>
        <img className={classes.image} src={depositCat} alt="happy Delphic" />
        <Typography variant="h5" gutterBottom>
          {t(fKeys.deposit.title.getKey())}
        </Typography>
        <div className={classes.text}>{t(fKeys.deposit.textBeforeTokens.getKey())}</div>
        <Table amounts={amounts!} />
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
  return null;
}

function Table({ amounts }: { amounts: TokenAmount[] }) {
  return (
    <Grid container wrap="nowrap">
      <Grid item container direction="column" spacing={1}>
        {amounts.map(amount => (
          <Grid item>
            <TokenName token={amount.currency} />
          </Grid>
        ))}
      </Grid>
      <Grid item container direction="column" spacing={1}>
        {amounts.map(amount => (
          <Grid item>
            <FormattedAmount sum={amount} variant="plain" hideSymbol />
          </Grid>
        ))}
      </Grid>
    </Grid>
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