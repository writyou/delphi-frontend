/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { useSnackbar, SnackbarMessage, SnackbarKey, SharedProps } from 'notistack';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import cn from 'classnames';
import { from, of } from 'rxjs';

import { SubmittedTransaction } from 'services/api';
import { Link, Grid } from 'components';
import { ErrorIcon, OkIcon, InfoIcon, CloseIcon } from 'components/icons';
import { useSubscribable } from 'utils/react';
import { ETH_NETWORK_CONFIG } from 'env';

import { useStyles } from './SnackMessage.style';

const getIcon = (variant: SharedProps['variant']) => {
  switch (variant) {
    case 'error':
      return ErrorIcon;
    case 'success':
      return OkIcon;
    case 'info':
      return InfoIcon;
    default:
      return InfoIcon;
  }
};

type Props = {
  message: SnackbarMessage;
  id: SnackbarKey;
  variant: SharedProps['variant'];
  transaction: SubmittedTransaction;
};

export const SnackMessage = React.forwardRef((props: Props, ref: any) => {
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();
  const { message, id, variant, transaction } = props;

  const hashRD = useSubscribable(() => (transaction ? from(transaction.tx) : of(undefined)), [
    transaction,
  ]);

  const hash = hashRD.toUndefined();
  const link = hash ? `${ETH_NETWORK_CONFIG.etherskanDomain}tx/${hash}` : undefined;

  const handleDismiss = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      closeSnackbar(id);
    },
    [id],
  );

  const Icon = getIcon(variant);

  return (
    <Link
      ref={ref}
      className={classes.root}
      underline="none"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Grid
        container
        wrap="nowrap"
        alignItems="center"
        spacing={1}
        className={cn(classes.card, {
          [classes.pending]: variant === 'info',
          [classes.success]: variant === 'success',
          [classes.error]: variant === 'error',
        })}
      >
        <Grid item>
          <Icon className={classes.icon} />
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle2" className={classes.typography}>
            {message}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleDismiss}
          >
            <CloseIcon className={cn(classes.icon, classes.closeIcon)} />
          </IconButton>
        </Grid>
      </Grid>
    </Link>
  );
});
