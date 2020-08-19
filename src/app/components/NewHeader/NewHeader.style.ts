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
      alignItems: 'center',
    },

    button: {
      marginLeft: 50,
      display: 'flex',
    },

    rightPart: {
      display: 'flex',
      alignItems: 'center',
    },

    liveStats: {
      marginLeft: 50,
    },

    links: {
      display: 'flex',
      marginLeft: 10,
      alignItems: 'center',
    },
  },
  { name: 'Header' },
);
