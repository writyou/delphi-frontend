import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router';

import { NETWORK_ID } from 'env';
import { useApi } from 'services/api';
import { getShortAddress } from 'utils/format';
import { useSubscribable, useCommunication, useOnChangeState } from 'utils/react';
import { makeStyles } from 'utils/styles';
import { tKeys, useTranslate } from 'services/i18n';
import { Button, Loading, Typography, Grid, JazzIcon, jsNumberForAddress } from 'components';

import { AuthModal } from './components/AuthModal';

interface Props {
  text?: string;
  connectRedirectPath?: string;
  disconnectRedirectPath?: string;
}

export function AuthButton({ text, connectRedirectPath, disconnectRedirectPath }: Props) {
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

  return (
    <>
      <Button
        color={connectedWallet ? 'default' : 'primary'}
        variant={connectedWallet ? 'outlined' : 'contained'}
        onClick={toggleIsOpened}
        disabled={!accountMeta.loaded}
        className={classes.root}
        endIcon={
          <Loading
            ignoreError
            meta={{ loaded: status !== 'pending', error: null }}
            communication={connectCommunication}
            progressVariant="circle"
            progressProps={{
              size: 24,
            }}
          />
        }
      >
        <Loading meta={accountMeta}>
          {account ? (
            <>
              <Avatar className={classes.icon}>
                <JazzIcon seed={jsNumberForAddress(account)} />
              </Avatar>
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
                  <Typography className={classes.connected}>
                    {`${t(tKeys.features.auth.modalTitle.connectedTo.getKey())} 
                    ${t(tKeys.features.networkWarning.networkType[NETWORK_ID].getKey())}`}
                  </Typography>
                </Grid>
              </Grid>
            </>
          ) : (
            <Typography className={classes.connect}>
              {text || t(tKeys.features.auth.connect.getKey())}
            </Typography>
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

const useStyles = makeStyles({
  root: {
    padding: '0 15px 0 0',
  },
  address: {
    fontSize: 12,
    lineHeight: 1,
  },
  connected: {
    fontSize: 12,
    lineHeight: 1,
    opacity: 0.5,
    marginTop: 3,
  },
  connect: {
    paddingLeft: 10,
  },
  container: {
    marginLeft: 11,
  },
  icon: {
    width: 34,
    height: 34,
    fontSize: 34,
  },
});
