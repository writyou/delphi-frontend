import React from 'react';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribableDeprecated } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { DeprecatedLoading } from 'components';
import { AllocateForm } from 'features/savingsPools';

export function AllocateTab() {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();
  const [pools, poolsMeta] = useSubscribableDeprecated(() => api.savings.getPools$(), [api]);

  return (
    <>
      <div className={classes.allocateTabDescription}>
        {t(tKeys.modules.savings.allocateTabText.getKey())}
      </div>
      <DeprecatedLoading meta={poolsMeta}>
        {pools && <AllocateForm pools={pools} />}
      </DeprecatedLoading>
    </>
  );
}

const useStyles = makeStyles(() => ({
  allocateTabDescription: {
    marginBottom: 40,
  },
}));
