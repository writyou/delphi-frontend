import React from 'react';

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

  return (
    <>
      <div className={classes.allocateTabDescription}>
        {t(tKeys.modules.investments.allocateTabText.getKey())}
      </div>
      <Loading meta={poolsMeta}>{pools && <AllocateForm pools={pools} />}</Loading>
    </>
  );
}

const useStyles = makeStyles(() => ({
  allocateTabDescription: {
    marginBottom: 40,
  },
}));
