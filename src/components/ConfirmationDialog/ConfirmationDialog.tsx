import React, { useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

import { useCommunication, ISubscriptionMeta } from 'utils/react';
import { Hint } from 'components/Hint/Hint';
import { makeStyles } from 'utils/styles';

import { Button } from '../Button';

export type ConfirmationDialogProps = {
  isOpen: boolean;
  children: React.ReactNode;
  contentMeta?: ISubscriptionMeta; // todo придумать/сделать
  title?: string;
  yesButton?: React.ReactElement;
  yesText?: string;
  noText?: string;
  onConfirm: () => Promise<void>;
  onCancel?: () => void;
};

function ConfirmationDialog(props: ConfirmationDialogProps) {
  const {
    onCancel,
    onConfirm,
    isOpen,
    title,
    children,
    contentMeta,
    noText,
    yesText,
    yesButton,
  } = props;

  const communication = useCommunication(onConfirm, []);
  const { status, error } = communication;

  const classes = useStyles();

  const handleCancel = useCallback(() => {
    onCancel && onCancel();
    communication.reset();
  }, [onCancel, communication.reset]);

  const contentLoaded = contentMeta ? contentMeta.loaded : true;

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleCancel}>
      <DialogContent className={classes.content}>
        <Grid container justify="center" spacing={4}>
          <CloseIcon className={classes.closeButton} onClick={handleCancel} />
          {title && (
            <Grid item xs={12}>
              <Typography variant="h5">{title}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            {children}
          </Grid>
          {communication.status === 'error' && error && (
            <Grid item xs={12}>
              <Hint>
                <Typography color="error">{error}</Typography>
              </Hint>
            </Grid>
          )}
          {onCancel && (
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleCancel}
                disabled={status === 'pending'}
              >
                {noText || 'Cancel'}
              </Button>
            </Grid>
          )}
          <Grid item xs={6}>
            {yesButton || (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                onClick={communication.execute}
                disabled={status === 'pending' || !contentLoaded}
              >
                {status === 'pending' ? <CircularProgress size={16} /> : yesText || 'Ok'}
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

const useStyles = makeStyles({
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    opacity: 0.5,
    cursor: 'pointer',
  },
  content: {
    padding: '50px !important',
  },
});

export { ConfirmationDialog };
