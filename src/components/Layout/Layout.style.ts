import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      margin: '0 auto',
      maxWidth: theme.breakpoints.values.desktopXL,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
    },

    container: {
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      [theme.breakpoints.up('tabletXS')]: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
      },
      [theme.breakpoints.up('tabletSM')]: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
      },
      [theme.breakpoints.up('desktopXS')]: {
        paddingLeft: theme.spacing(11),
        paddingRight: theme.spacing(11),
        paddingTop: theme.spacing(5),
      },
      [theme.breakpoints.up('desktopMD')]: {
        paddingLeft: theme.spacing(13.5),
        paddingRight: theme.spacing(13.5),
      },
      [theme.breakpoints.up('desktopLG')]: {
        paddingLeft: theme.spacing(30),
        paddingRight: theme.spacing(30),
      },
      [theme.breakpoints.up('desktopXL')]: {
        paddingLeft: theme.spacing(37),
        paddingRight: theme.spacing(37),
      },
    },

    header: {
      paddingTop: theme.spacing(2.5),
      paddingBottom: 20,
      [theme.breakpoints.up('tabletXS')]: {
        paddingBottom: 90,
      },
      [theme.breakpoints.up('tabletSM')]: {
        paddingTop: theme.spacing(5),
      },
    },

    footer: {
      marginTop: 'auto',

      paddingBottom: 28,
      [theme.breakpoints.up('tabletXS')]: {
        paddingBottom: 34,
      },

      [theme.breakpoints.up('desktopMD')]: {
        paddingBottom: 25,
      },
    },

    socials: {
      paddingBottom: 35,

      [theme.breakpoints.up('tabletXS')]: {
        position: 'fixed',
        top: '29%',
        right: -3,
      },

      [theme.breakpoints.up('tabletSM')]: {
        right: 18,
      },
    },
  }),
  { name: 'Layout' },
);
