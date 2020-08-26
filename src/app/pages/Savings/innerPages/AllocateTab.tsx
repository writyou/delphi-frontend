import React, { memo } from 'react';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import * as R from 'ramda';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { Loading } from 'components';
import { AllocateForm } from 'features/savingsPools';

export const AllocateTab = memo(() => {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();

  const poolsRD = useSubscribable(
    () =>
      api.savings.getPools$().pipe(
        switchMap(pools =>
          combineLatest(
            pools.map(p =>
              api.user.getSavingsDepositLimit$(p.address).pipe(map(limit => ({ pool: p, limit }))),
            ),
          ),
        ),
        map(data => ({
          pools: R.pluck('pool', data),
          hasLimits: R.pluck('limit', data).some(l => l && !l.isZero()),
        })),
      ),
    [api],
  );

  return (
    <>
      <div className={classes.allocateTabDescription}>
        {t(tKeys.modules.savings.allocateTabText.getKey())}
      </div>
      <Loading data={poolsRD}>
        {poolsData => <AllocateForm pools={poolsData.pools} hasLimits={poolsData.hasLimits} />}
      </Loading>
    </>
  );
});

const useStyles = makeStyles(() => ({
  allocateTabDescription: {
    marginBottom: 40,
  },
}));
