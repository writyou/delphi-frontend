import { makeStyles } from 'utils/styles';

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.up('tabletXS')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },

    copyright: {
      marginBottom: 20,

      [theme.breakpoints.up('tabletXS')]: {
        marginBottom: 0,
      },
    },

    nav: {
      marginBottom: 12,
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',

      [theme.breakpoints.up('tabletXS')]: {
        marginBottom: 20,
        justifyContent: 'flex-start',
      },

      [theme.breakpoints.up('desktopMD')]: {
        marginBottom: 12,
      },
    },

    text: {
      fontSize: 12,
      opacity: 0.3,
      lineHeight: 1,

      [theme.breakpoints.up('tabletXS')]: {
        fontSize: 12,
        lineHeight: 1.33,
        maxWidth: 313,
      },

      [theme.breakpoints.up('tabletSM')]: {
        maxWidth: 441,
      },

      [theme.breakpoints.up('desktopMD')]: {
        lineHeight: 'normal',
      },
    },

    partners: {
      display: 'flex',

      [theme.breakpoints.up('tabletXS')]: {
        marginLeft: 32,
      },
    },

    partnerLink: {
      '& + $partnerLink': {
        marginLeft: 43,

        [theme.breakpoints.up('tabletXS')]: {
          marginLeft: 20,
        },
      },
    },

    partnerIcon: {
      fontSize: 34,

      [theme.breakpoints.up('tabletXS')]: {
        fontSize: 40,
      },
    },

    link: {
      fontSize: 10,

      [theme.breakpoints.up('tabletXS')]: {
        fontSize: 12,
      },

      '& + $link': {
        [theme.breakpoints.up('tabletXS')]: {
          marginLeft: 50,
        },
      },
    },
  }),
  { name: 'Footer' },
);

export { useStyles };
