import React from 'react';

import { useApi } from 'services/api';
import { tKeys, useTranslate } from 'services/i18n';
import { useSubscribable } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { Loading } from 'components';
import { AllocateForm } from 'features/savingsPools';

export function AllocateTab() {
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();
  const poolsRD = useSubscribable(() => api.savings.getPools$(), [api]);

  return (
    <>
      <div className={classes.allocateTabDescription}>
        {t(tKeys.modules.savings.allocateTabText.getKey())}
      </div>
      <Loading data={poolsRD}>{pools => <AllocateForm pools={pools} />}</Loading>
    </>
  );
}

const useStyles = makeStyles(() => ({
  allocateTabDescription: {
    marginBottom: 40,
  },
}));
