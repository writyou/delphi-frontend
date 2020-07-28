import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  () => ({
    root: {
      padding: ' 0 30px 30px 30px',
      width: 413,
      height: 214,
      backgroundColor: '#2d2d40',
      borderRadius: 6,
      color: 'white',
    },
    header: {
      marginTop: -15,
      marginBottom: 40,
      height: 30,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardName: {
      padding: '0 10px',
      height: 22,
      borderRadius: 11,
      backgroundColor: '#3b3b7a',
    },
    tokens: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    token: {
      marginLeft: 10,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#f5ac37',
    },
    row: {
      marginBottom: 30,
      display: 'flex',
      justifyContent: 'space-between',
    },
    value: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
  }),
  { name: 'SavingsCard' },
);
