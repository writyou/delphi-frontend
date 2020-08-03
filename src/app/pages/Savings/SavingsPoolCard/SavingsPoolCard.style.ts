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
    token: {
      marginLeft: 10,
      fontSize: 30,
    },
    tokenIcon: {
      fontSize: 'inherit',
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
  }),
  { name: 'SavingsPoolCard' },
);
