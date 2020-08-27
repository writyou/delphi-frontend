import React, { useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';

import { useSubscribableDeprecated, useCommunication } from 'utils/react';
import { WalletType } from 'services/api';

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

  const [account] = useSubscribableDeprecated(() => web3Manager.account$, [], null);
  const [connectedWallet] = useSubscribableDeprecated(() => web3Manager.connectedWallet$, [], null);

  const history = useHistory();

  const connectToWallet = useCallback(
    async (wallet: WalletType) => {
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
    [web3Manager, connectedWallet, disconnectRedirectPath, connectRedirectPath],
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
      <AuthModal
        connectedWallet={connectedWallet}
        isOpened={isModalOpened}
        onClose={closeModal}
        account={account}
        connecting={connectCommunication}
        connect={connectCommunication.execute}
        disconnect={handleAuthModalDisconnect}
      />
    </AuthContext.Provider>
  );
}
