import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 6,
      background: theme.colors.blackRussian,

      padding: 10,
      [theme.breakpoints.up('mobileMD')]: {
        padding: '10px 10px 10px 20px',
      },
      [theme.breakpoints.up('tabletXS')]: {
        padding: '10px 10px 10px 50px',
      },
    },
    catImage: {
      fontSize: 40,
      marginRight: 17,
      [theme.breakpoints.up('tabletXS')]: {
        fontSize: 80,
        marginRight: 20,
      },
    },
    text: {
      flexGrow: 1,
      color: 'white',
      fontWeight: 300,

      fontSize: 10,
      lineHeight: '14px',
      [theme.breakpoints.up('mobileMD')]: {
        fontSize: 12,
        lineHeight: '18px',
      },
    },
    colored: {
      color: theme.colors.heliotrope,
    },
    closeIcon: {
      alignSelf: 'flex-start',
      marginLeft: 10,
    },
  }),
  { name: 'PreauditVersionWarning' },
);
