import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import { CommunicationState } from 'utils/react';
import { Dialog, DialogTitle, DialogContent, Hint, Grid, Link, Typography } from 'components';
import { WalletType, wallets } from 'services/api';
import { makeStyles } from 'utils/styles';
import { tKeys, useTranslate } from 'services/i18n';
import { T_AND_C_URL, PRIVACY_POLICY_URL } from 'docs';

import { ProviderButton } from './ProviderButton';

interface AuthModalProps {
  isOpened: boolean;
  connecting: CommunicationState<any, any>;
  account: string | null;
  connectedWallet: WalletType | null;
  onClose(): void;
  connect(wallet: WalletType): Promise<void>;
  disconnect(): void;
}

export function AuthModal(props: AuthModalProps) {
  const { isOpened, onClose, connecting, connect, account, disconnect, connectedWallet } = props;
  const isLogged: boolean = !!account && !!connectedWallet;

  const classes = useStyles();

  const { t } = useTranslate();
  const { modalTitle } = tKeys.features.auth;

  return (
    // tabIndex needed for Fortmatic form. Without tabIndex, form input cannot be taken into focus
    <Dialog
      classes={{ paper: classes.root }}
      open={isOpened}
      onClose={onClose}
      TransitionProps={{ tabIndex: 'unset' } as any}
      scroll="body"
    >
      <DialogTitle disableTypography>
        {isLogged ? t(modalTitle.connected.getKey()) : t(modalTitle.disconnected.getKey())}
      </DialogTitle>
      <CloseIcon className={classes.closeButton} onClick={onClose} />
      <DialogContent className={classes.content}>
        <Grid container spacing={3} justify="center">
          {wallets.map((type, index) => (
            <Grid item xs={4} key={index} className={classes.providerButton}>
              <ProviderButton
                connect={connect}
                disconnect={disconnect}
                type={type}
                connectedAddress={type === connectedWallet ? account : null}
                key={type}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogContent className={classes.content}>
        <Hint>
          <Typography className={classes.aboutTerms}>
            By connecting your wallet, you agree to our{' '}
            <Link
              href={T_AND_C_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Terms of Service"
              color="textPrimary"
            >
              Terms&nbsp;of&nbsp;Service
            </Link>{' '}
            and confirm that you have read and understood the{' '}
            <Link
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Privacy Policy"
              color="textPrimary"
            >
              Privacy&nbsp;Policy
            </Link>
            .
          </Typography>
        </Hint>
      </DialogContent>
      {connecting.error && (
        <DialogContent>
          <Hint color="error">{connecting.error}</Hint>
        </DialogContent>
      )}
    </Dialog>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '50px 60px',
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    opacity: 0.5,
    cursor: 'pointer',
  },
  content: {
    overflow: 'visible',
    padding: 0,
    marginTop: 30,
  },
  providerButton: {
    marginTop: 20,
    textAlign: 'center',
  },
  aboutTerms: {
    fontSize: 12,
  },
});
