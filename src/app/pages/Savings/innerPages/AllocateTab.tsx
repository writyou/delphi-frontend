import React, { memo } from 'react';
import { combineLatest, of } from 'rxjs';
import * as R from 'ramda';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribableDeprecated } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { DeprecatedLoading } from 'components';
import { AllocateForm } from 'features/savingsPools';

export const AllocateTab = memo(() => {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();
  const [pools, poolsMeta] = useSubscribableDeprecated(() => api.savings.getPools$(), [api]);
  const [limits, limitsMeta] = useSubscribableDeprecated(
    () =>
      pools?.length
        ? combineLatest(pools.map(p => api.user.getSavingsDepositLimit$(p.address)))
        : of(undefined),
    [api, R.toString(pools)],
  );
  const hasLimits = limits ? limits.some(l => l && !l.isZero()) : false;

  return (
    <>
      <div className={classes.allocateTabDescription}>
        {t(tKeys.modules.savings.allocateTabText.getKey())}
      </div>
      <DeprecatedLoading meta={[poolsMeta, limitsMeta]}>
        {pools && <AllocateForm pools={pools} hasLimits={hasLimits} />}
      </DeprecatedLoading>
    </>
  );
});

const useStyles = makeStyles(() => ({
  allocateTabDescription: {
    marginBottom: 40,
  },
}));
