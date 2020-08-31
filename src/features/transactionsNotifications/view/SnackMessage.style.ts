import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      [theme.breakpoints.up('sm')]: {
        minWidth: '344px !important',
      },
    },
    card: {
      borderRadius: 4,
      backgroundColor: '#fddc6c',
      width: '100%',
      padding: '8px 16px',
    },
    typography: {
      fontFamily: 'HelveticaNeue, Helvetica Neue',
      fontSize: 12,
      fontWeight: 'normal',
      color: '#0a0a0e',
    },
    icons: {
      marginLeft: 'auto !important',
      display: 'flex',
      alignItems: 'center',
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
      fontSize: 24,
      color: '#0a0a0e',
    },
    statusIcon: {
      marginRight: 8,
    },
    closeIcon: {
      fontSize: 17,
      marginLeft: 30,
    },
  }),
  { name: 'SnackMessage' },
);
