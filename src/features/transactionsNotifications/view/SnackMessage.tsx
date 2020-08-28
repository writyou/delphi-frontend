/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import { useSnackbar, SnackbarMessage, SnackbarKey, SharedProps } from 'notistack';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import cn from 'classnames';
import { from, of } from 'rxjs';

import { SubmittedTransaction } from 'services/api';
import { ErrorIcon, OkIcon, InfoIcon } from 'components/icons';
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
      e.stopPropagation();
      closeSnackbar(id);
    },
    [id],
  );

  const handleClick = useCallback(() => {
    if (link) {
      window.open(link);
    }
  }, [link]);
  const Icon = getIcon(variant);

  return (
    <div ref={ref} className={classes.root} onClick={handleClick} role="link">
      <Card
        className={cn(classes.card, {
          [classes.pending]: variant === 'info',
          [classes.success]: variant === 'success',
          [classes.error]: variant === 'error',
        })}
      >
        <CardActions classes={{ root: classes.actionRoot }}>
          <Icon />
          <Typography variant="subtitle2" className={classes.typography}>
            {message}
          </Typography>
          <div className={classes.icons}>
            <IconButton key="close" aria-label="close" color="inherit" onClick={handleDismiss}>
              <CloseIcon className={classes.icon} />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </div>
  );
});
