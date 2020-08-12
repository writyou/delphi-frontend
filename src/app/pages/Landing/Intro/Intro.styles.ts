import { makeStyles } from 'utils/styles';

const useStyles = makeStyles(theme => ({
  textLogo: {
    fontSize: theme.spacing(2.6),
    marginLeft: theme.spacing(2.5),
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
  },

  button: {
    margin: '0 16px',
  },

  disclaimer: {
    minWidth: 240,
    fontWeight: 300,
    fontSize: 12,

    marginLeft: theme.spacing(1.5),
    [theme.breakpoints.up('tabletXS')]: {
      fontSize: 15,
      marginLeft: theme.spacing(2.5),
    },
  },
}));

export { useStyles };
