import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 6,
      border: 'solid 1px #2d2d40',
      padding: '10px 10px 10px 50px',
    },
    catImage: {
      fontSize: 80,
      marginRight: 20,
    },
    text: {
      flexGrow: 1,
      color: 'white',
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
