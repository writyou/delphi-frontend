import { makeStyles } from 'utils/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  icon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 56,
    marginBottom: theme.spacing(5),
  },
  title: {
    fontWeight: 200,

    maxWidth: 550,
    fontSize: 18,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('tabletXS')]: {
      fontSize: theme.spacing(5),
      marginBottom: theme.spacing(1.75),
    },
    [theme.breakpoints.up('tabletSM')]: {
      maxWidth: 'initial',
      paddingRight: '15%',
    },
    [theme.breakpoints.up('desktopLG')]: {
      fontSize: 70,
    },
  },
  description: {
    fontWeight: 300,

    fontSize: theme.spacing(1.5),
    [theme.breakpoints.up('tabletXS')]: {
      fontSize: theme.spacing(2),
    },
    [theme.breakpoints.up('tabletXS')]: {
      fontSize: theme.spacing(2.75),
    },
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: theme.spacing(2.5),
    [theme.breakpoints.up('tabletXS')]: {
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.up('tabletXS')]: {
      marginTop: theme.spacing(5),
    },
  },
}));

export { useStyles };
