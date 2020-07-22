import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },

  logo: {
    marginRight: 'auto',

    fontSize: theme.spacing(2.5),
    [theme.breakpoints.up('tabletXS')]: {
      fontSize: theme.spacing(5),
    },
  },

  navInline: {
    marginLeft: theme.spacing(2.5),
    [theme.breakpoints.up('tabletXS')]: {
      marginLeft: theme.spacing(6),
    },
  },
}));
