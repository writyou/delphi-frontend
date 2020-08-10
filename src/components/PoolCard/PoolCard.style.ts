import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      borderRadius: 6,
    },
    content: {
      padding: 30,
      borderRadius: 6,
      color: theme.palette.text.primary,
    },
    tokenIcon: {
      fontSize: 30,
    },
    row: {
      marginBottom: 30,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      '&:last-child': {
        marginBottom: 0,
      },
    },
    balance: {
      fontSize: 32,
    },
    link: {
      fontSize: 12,
    },
    linkDisabled: {
      pointerEvents: 'none',
    },
    availableDepositRow: {
      display: 'flex',
      justifyContent: 'flex-start',
      marginTop: -20,
      fontSize: 12,
    },
    circle: {
      width: 10,
      height: 10,
      backgroundColor: '#494a73',
      borderRadius: '50%',
      marginRight: 6,
    },
    green: {
      backgroundColor: '#6bfe97',
    },
  }),
  { name: 'PoolCard' },
);
