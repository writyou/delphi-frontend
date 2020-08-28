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
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      '& + &': {
        marginTop: 30,
      },
      '& + &$availableDepositRow': {
        fontSize: 12,
        marginTop: 12,
      },
      '& + &$additionalElementRow': {
        display: 'block',
      },
      '&:empty': {
        display: 'none',
      },
    },
    balance: {
      fontSize: 32,
      fontWeight: 300,
    },
    link: {
      fontSize: 12,
    },
    linkDisabled: {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    availableDepositRow: {},
    actionsRow: {},
  }),
  { name: 'PoolCard' },
);
