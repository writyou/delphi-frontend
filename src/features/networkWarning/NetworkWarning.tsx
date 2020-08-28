import * as React from 'react';

import { useSubscribable } from 'utils/react';
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

  React.useEffect(
    () =>
      chainIdRD.foldOption(
        () => undefined,
        chainId => (chainId === NETWORK_ID ? setIsOpen(false) : setIsOpen(true)),
      ),
    [chainIdRD],
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
