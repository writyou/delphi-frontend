import React from 'react';
import { combineLatest, of } from 'rxjs';
import * as R from 'ramda';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { Loading } from 'components';
import { AllocateForm } from 'features/investments';

export function AllocateTab() {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();
  const [pools, poolsMeta] = useSubscribable(() => api.investments.getPools$(), [api]);
  const [limits, limitsMeta] = useSubscribable(
    () =>
      pools?.length
        ? combineLatest(pools.map(p => api.user.getInvestmentsDepositLimit$(p.address)))
        : of(undefined),
    [api, R.toString(pools)],
  );
  const hasLimits = limits ? limits.some(l => l && !l.isZero()) : false;

  return (
    <>
      <div className={classes.allocateTabDescription}>
        {t(tKeys.modules.investments.allocateTabText.getKey())}
      </div>
      <Loading meta={[poolsMeta, limitsMeta]}>
        {pools && <AllocateForm pools={pools} hasLimits={hasLimits} />}
      </Loading>
    </>
  );
}

const useStyles = makeStyles(() => ({
  allocateTabDescription: {
    marginBottom: 40,
  },
}));
