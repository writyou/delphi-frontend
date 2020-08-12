import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 6,
      padding: '10px 10px 10px 50px',
      background: theme.colors.blackRussian,
    },
    catImage: {
      fontSize: 80,
      marginRight: 20,
    },
    text: {
      flexGrow: 1,
      color: 'white',
      fontWeight: 300,
    },
    colored: {
      color: theme.colors.heliotrope,
    },
    closeIcon: {
      alignSelf: 'flex-start',
      marginLeft: 20,
    },
  }),
  { name: 'PreauditVersionWarning' },
);
