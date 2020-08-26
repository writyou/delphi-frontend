import React, { useCallback } from 'react';
import cn from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { NETWORK_ID } from 'env';
import { useAuthContext } from 'services/auth';
import { tKeys, useTranslate } from 'services/i18n';
import { Adaptive } from 'services/adaptability';
import { getShortAddress } from 'utils/format';
import { useSubscribable } from 'utils/react';
import { makeStyles } from 'utils/styles';
import {
  Button,
  Typography,
  Grid,
  AddressIcon,
  ButtonProps,
  Loading,
  DeprecatedLoading,
} from 'components';
import { isLoading, isSuccess } from 'utils/remoteData';

interface Props {
  children?: React.ReactNode;
  size?: ButtonProps['size'];
}

export function AuthButton({ children, size }: Props) {
  const classes = useStyles();
  const { t } = useTranslate();
  const { web3Manager, openModal, connectCommunication } = useAuthContext();

  const accountStatusRD = useSubscribable(
    () =>
      combineLatest([web3Manager.account$, web3Manager.status$]).pipe(
        map(([account, status]) => ({
          account,
          status,
        })),
      ),
    [web3Manager],
  );

  const isConnected: boolean = isSuccess(accountStatusRD);

  const handleAuthButtonClick = useCallback(() => {
    openModal();
  }, [openModal]);

  return (
    <>
      <Button
        size={size}
        color={isConnected ? 'default' : 'primary'}
        variant={isConnected ? 'outlined' : 'contained'}
        onClick={handleAuthButtonClick}
        disabled={isLoading(accountStatusRD)}
        className={cn(classes.root, { [classes.connected]: isConnected })}
        endIcon={
          <DeprecatedLoading
            ignoreError
            meta={{ loaded: !isLoading(accountStatusRD), error: null }}
            communication={connectCommunication}
            progressVariant="circle"
            progressProps={{
              size: 16,
            }}
          />
        }
      >
        <Loading data={accountStatusRD}>
          {accountStatus =>
            accountStatus.account ? (
              <>
                <Avatar className={classes.icon}>
                  <AddressIcon address={accountStatus.account} />
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
                      <Typography className={classes.address}>
                        {getShortAddress(accountStatus.account)}
                      </Typography>
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
              <> {children || t(tKeys.features.auth.connect.getKey())} </>
            )
          }
        </Loading>
      </Button>
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
