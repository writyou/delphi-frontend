import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      [theme.breakpoints.up('sm')]: {
        minWidth: '344px !important',
      },
      borderRadius: 4,
    },
    card: {
      backgroundColor: '#fddc6c',
      width: '100%',
    },
    typography: {
      fontFamily: 'HelveticaNeue, Helvetica Neue',
      fontSize: 12,
      fontWeight: 'normal',
      color: '#0a0a0e',
    },
    actionRoot: {
      padding: '8px 8px 8px 16px',
    },
    icons: {
      marginLeft: 'auto',
    },
    button: {
      padding: 0,
      textTransform: 'none',
    },
    pending: {
      backgroundColor: '#594cf2',
    },
    success: {
      backgroundColor: '#6bfe97',
    },
    error: {
      backgroundColor: '#fe5a59',
    },
    icon: {
      fontSize: 20,
      color: '#0a0a0e',
    },
  }),
  { name: 'SnackbarMessage' },
);
