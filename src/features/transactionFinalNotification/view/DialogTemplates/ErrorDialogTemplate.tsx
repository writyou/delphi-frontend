import React from 'react';

import { makeStyles } from 'utils/styles';
import { tKeys, useTranslate } from 'services/i18n';
import { Typography } from 'components';

import errorCat from '../images/error-cat.svg';

export type ErrorDialogProps = {
  variant: 'depositError' | 'withdrawError';
};

const fKeys = tKeys.features.transactionFinalNotification;

export function ErrorDialogTemplate({ variant }: ErrorDialogProps) {
  const { t } = useTranslate();
  const classes = useStyles();

  return (
    <>
      <img className={classes.image} src={errorCat} alt="sad Delphic" />
      <Typography variant="h5" gutterBottom>
        {t(fKeys[variant].title.getKey())}
      </Typography>
      <div className={classes.text}>{t(fKeys[variant].text.getKey())}</div>
      <div className={classes.text}>{t(fKeys[variant].problems.getKey())}</div>
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
