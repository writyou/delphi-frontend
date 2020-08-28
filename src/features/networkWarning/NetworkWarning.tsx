import * as React from 'react';

import { useSubscribable, useOnChangeState } from 'utils/react';
import { useApi } from 'services/api';
import { NETWORK_ID } from 'env';
import { ConfirmationDialog } from 'components';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

const tKeys = tKeysAll.features.networkWarning;

export function NetworkWarning() {
  const api = useApi();
  const { t } = useTranslate();

  const chainIdRD = useSubscribable(() => api.web3Manager.chainId$, [api]);
  const [isOpen, setIsOpen] = React.useState(false);

  useOnChangeState(
    // TODO need to research api
    chainIdRD.fold(
      () => undefined,
      () => undefined,
      () => undefined,
      chainID => chainID,
    ),
    (prev, cur) => prev !== cur,
    (_, cur) => (!cur || cur === NETWORK_ID ? setIsOpen(false) : setIsOpen(true)),
  );

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      yesText={t(tKeys.disconnectButton.getKey())}
      onConfirm={api.web3Manager.disconnect}
      onCancel={() => {}}
    >
      {t(tKeys.warning.getKey(), {
        name: t(tKeys.networkName[NETWORK_ID].getKey()),
        type: t(tKeys.networkType[NETWORK_ID].getKey()),
      })}
    </ConfirmationDialog>
  );
}
