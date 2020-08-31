import React from 'react';
import { TokenAmount } from '@akropolis-web/primitives';

import { makeStyles } from 'utils/styles';
import { tKeys, useTranslate } from 'services/i18n';
import { Typography, Link } from 'components';

import withdrawCat from '../images/withdraw-cat.svg';
import { AmountsTable } from '../AmountsTable';

export type WithdrawDialogProps = {
  amounts: TokenAmount[];
  wallet: string;
  withdrawLink: string;
};

const fKeys = tKeys.features.transactionFinalNotification;

export function WithdrawDialogTemplate({ amounts, withdrawLink, wallet }: WithdrawDialogProps) {
  const { t } = useTranslate();
  const classes = useStyles();

  return (
    <>
      <img className={classes.image} src={withdrawCat} alt="happy Delphic" />
      <Typography variant="h5" gutterBottom>
        {t(fKeys.withdraw.title.getKey())}
      </Typography>
      <div className={classes.text}>{t(fKeys.withdraw.textBeforeTokens.getKey())}</div>
      <AmountsTable amounts={amounts!} />
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
