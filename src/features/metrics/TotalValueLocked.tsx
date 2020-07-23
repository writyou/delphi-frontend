import * as React from 'react';

import { Metric, Label, FormattedAmount } from 'components';
import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { liquidityAmount } from 'utils/mock';
import { makeStyles } from 'utils/styles';

const tKeys = tKeysAll.components.metrics;

export function TotalValueLocked() {
  const { t } = useTranslate();
  const classes = useStyles();

  return (
    <Metric
      title={
        <span className={classes.title}>
          <Label>{t(tKeys.totalValueLocked.getKey())}</Label>
        </span>
      }
      value={<FormattedAmount sum={liquidityAmount} />}
    />
  );
}

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 12,
  },
}));
