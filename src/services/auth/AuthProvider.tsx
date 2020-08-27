import React, { useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { useSubscribable, useCommunication } from 'utils/react';
import { WalletType } from 'services/api';
import { Loading } from 'components';

import { AuthModal } from './view/AuthModal';
import { AuthContext, AuthWeb3Manager } from './AuthContext';

type Props = {
  web3Manager: AuthWeb3Manager;
  children: React.ReactNode;
  disconnectRedirectPath: string;
  defaultConnectRedirectPath?: string;
};

export function AuthProvider(props: Props) {
  const { web3Manager, disconnectRedirectPath, defaultConnectRedirectPath, children } = props;

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [connectRedirectPath, setConnectRedirectPath] = useState(defaultConnectRedirectPath);

  const accountWalletRD = useSubscribable(
    () =>
      combineLatest(web3Manager.account$, web3Manager.connectedWallet$).pipe(
        map(([account, connectedWallet]) => ({ account, connectedWallet })),
      ),
    [],
  );

  const history = useHistory();

  const connectToWallet = useCallback(
    async (wallet: WalletType) => {
      // TODO need to research api
      const connectedWallet = accountWalletRD.fold(
        () => undefined,
        () => undefined,
        () => undefined,
        values => values.connectedWallet,
      );
      const currentWallet = connectedWallet;
      const connectResult = await web3Manager.connect(wallet);
      if (wallet === currentWallet) {
        disconnectRedirectPath && history.push(disconnectRedirectPath);
      } else {
        connectRedirectPath && history.push(connectRedirectPath);
      }

      closeModal();

      return connectResult;
    },
    [web3Manager, accountWalletRD, disconnectRedirectPath, connectRedirectPath],
  );
  const connectCommunication = useCommunication(connectToWallet, []);

  const openModal = useCallback(
    (redirectPath?: string) => {
      setIsModalOpened(true);

      if (redirectPath && redirectPath !== connectRedirectPath) {
        setConnectRedirectPath(redirectPath);
      }
    },
    [connectRedirectPath],
  );

  const closeModal = useCallback(() => {
    setIsModalOpened(false);

    if (connectRedirectPath !== defaultConnectRedirectPath) {
      setConnectRedirectPath(defaultConnectRedirectPath);
    }
  }, [connectRedirectPath, defaultConnectRedirectPath]);

  const handleAuthModalDisconnect = useCallback(() => {
    web3Manager.disconnect();
    connectCommunication.reset();
    closeModal();
  }, [connectCommunication]);

  const context: AuthContext = useMemo(
    () => ({ web3Manager, connectCommunication, openModal, closeModal }),
    [web3Manager, connectCommunication, openModal, closeModal],
  );

  return (
    <AuthContext.Provider value={context}>
      {children}
      <Loading data={accountWalletRD}>
        {accountWallet => (
          <AuthModal
            connectedWallet={accountWallet.connectedWallet}
            isOpened={isModalOpened}
            onClose={closeModal}
            account={accountWallet.account}
            connecting={connectCommunication}
            connect={connectCommunication.execute}
            disconnect={handleAuthModalDisconnect}
          />
        )}
      </Loading>
    </AuthContext.Provider>
  );
}
