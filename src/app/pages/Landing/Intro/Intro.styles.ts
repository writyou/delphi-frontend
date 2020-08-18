import { makeStyles } from 'utils/styles';

const useStyles = makeStyles(
  theme => ({
    textLogo: {
      fontSize: theme.spacing(2.6),
      marginLeft: theme.spacing(2.5),
    },

    buttons: {
      fontSize: 16,
      maxWidth: 480,
    },

    button: {
      minWidth: 130,
      marginBottom: 20,

      [theme.breakpoints.up('tabletXS')]: {
        minWidth: 136,
        marginBottom: 0,
        fontSize: 20,
      },
    },

    buttonComponent: {
      [theme.breakpoints.up('tabletXS')]: {
        fontSize: 20,
      },
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
  }),
  { name: 'Intro' },
);

export { useStyles };
