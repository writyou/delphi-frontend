import * as React from 'react';
import { SnackbarProvider } from 'notistack';

interface IProps {
  children: React.ReactElement;
}

function Snackbar(props: IProps) {
  const { children } = props;
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      {children}
    </SnackbarProvider>
  );
}

export { Snackbar };
