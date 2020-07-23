import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  {
    root: {
      padding: '16px 50px',
      display: 'flex',
      justifyContent: 'space-between',
    },

    leftPart: {
      display: 'flex',
    },

    authButton: {
      marginLeft: 50,
      display: 'flex',
    },

    rightPart: {
      display: 'flex',
      alignItems: 'center',
    },

    links: {
      display: 'flex',
      marginLeft: 10,
      alignItems: 'center',
    },
  },
  { name: 'Header' },
);
