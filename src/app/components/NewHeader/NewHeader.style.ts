import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  {
    root: {
      padding: '10px 50px',
      minHeight: 72,
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
      alignItems: 'center',
    },
  },
  { name: 'Header' },
);
