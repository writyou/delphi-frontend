import * as React from 'react';
import cn from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router';

import { NETWORK_ID } from 'env';
import { useApi } from 'services/api';
import { getShortAddress } from 'utils/format';
import { useSubscribable, useCommunication, useOnChangeState } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { tKeys, useTranslate } from 'services/i18n';
import { Button, Loading, Typography, Grid, AddressIcon, ButtonProps } from 'components';
import { Adaptive } from 'services/adaptability';

import { AuthModal } from './components/AuthModal';

interface Props {
  children?: React.ReactNode;
  size?: ButtonProps['size'];
  connectRedirectPath?: string;
  disconnectRedirectPath?: string;
}

export function AuthButton({ children, size, connectRedirectPath, disconnectRedirectPath }: Props) {
  const [isOpened, setIsOpened] = React.useState(false);
  const [needToRedirect, setNeedToRedirect] = React.useState(false);
  const api = useApi();
  const classes = useStyles();
  const { t } = useTranslate();

  const [account, accountMeta] = useSubscribable(() => api.web3Manager.account$, [], null);
  const [status] = useSubscribable(() => api.web3Manager.status$, [], 'pending');
  const [connectedWallet] = useSubscribable(() => api.web3Manager.connectedWallet$, [], null);

  const connectCommunication = useCommunication(api.web3Manager.connect, []);

  const toggleIsOpened = React.useCallback(() => {
    setIsOpened(!isOpened);
    !isOpened && setNeedToRedirect(true);
  }, [isOpened]);

  const handleDisconnectClick = React.useCallback(() => {
    api.web3Manager.disconnect();
    connectCommunication.reset();
    setIsOpened(false);
  }, [connectCommunication.reset]);

  const history = useHistory();

  useOnChangeState(
    { needToRedirect, connectedWallet },
    (prev, cur) => prev.connectedWallet !== cur.connectedWallet,
    (_, cur) => {
      setNeedToRedirect(false);

      if (!cur.connectedWallet) {
        disconnectRedirectPath && history.push(disconnectRedirectPath);
      } else {
        connectRedirectPath && cur.needToRedirect && history.push(connectRedirectPath);
      }
    },
  );

  const isConnected: boolean = accountMeta.loaded && !!account;

  return (
    <>
      <Button
        size={size}
        color={connectedWallet ? 'default' : 'primary'}
        variant={connectedWallet ? 'outlined' : 'contained'}
        onClick={toggleIsOpened}
        disabled={!accountMeta.loaded}
        className={cn(classes.root, { [classes.connected]: isConnected })}
        endIcon={
          <Loading
            ignoreError
            meta={{ loaded: status !== 'pending', error: null }}
            communication={connectCommunication}
            progressVariant="circle"
            progressProps={{
              size: 16,
            }}
          />
        }
      >
        <Loading meta={accountMeta}>
          {account ? (
            <>
              <Avatar className={classes.icon}>
                <AddressIcon address={account} />
              </Avatar>
              <Adaptive from="mobileMD">
                <Grid
                  container
                  alignItems="flex-start"
                  direction="column"
                  spacing={0}
                  className={classes.container}
                >
                  <Grid item>
                    <Typography className={classes.address}>{getShortAddress(account)}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.connectedTo} align="left">
                      {`${t(tKeys.features.auth.modalTitle.connectedTo.getKey())} 
                    ${t(tKeys.features.networkWarning.networkType[NETWORK_ID].getKey())}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Adaptive>
            </>
          ) : (
            children || t(tKeys.features.auth.connect.getKey())
          )}
        </Loading>
      </Button>
      <AuthModal
        connectedWallet={connectedWallet}
        isOpened={isOpened}
        onClose={toggleIsOpened}
        account={account}
        connecting={connectCommunication}
        connect={connectCommunication.execute}
        disconnect={handleDisconnectClick}
      />
    </>
  );
}

const useStyles = makeStyles(
  {
    root: {
      '&$connected': {
        padding: 0,
      },
      minWidth: 'unset',
    },
    address: {
      fontSize: 12,
      lineHeight: 1,
    },
    connectedTo: {
      fontSize: 12,
      lineHeight: 1,
      opacity: 0.5,
      marginTop: 3,
    },
    container: {
      marginLeft: 11,
      paddingRight: 16,
    },
    icon: {
      width: 34,
      height: 34,
      fontSize: 34,
    },
    connected: {},
  },
  { name: 'AuthButton' },
);
