import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      height: '100%',
    },

    headerAndContent: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      overflow: 'auto',
      padding: '25px 50px 50px 56px',

      '&:first-child': {
        paddingLeft: 50,
      },
    },

    // TODO: remove duplication with extand plugin

    header: {
      backgroundColor: theme.palette.background.paperSecondary,
      borderRadius: 6,
      transition: theme.transitions.create('background-color'),
    },

    preauditVersionWarning: {
      marginTop: 47,

      '&:empty': {
        display: 'none',
      },
    },

    content: {
      flex: '1 100%',
      marginTop: 48,
    },

    footer: {
      marginTop: 48,
      backgroundColor: theme.palette.background.paperSecondary,
      borderRadius: 6,
      transition: theme.transitions.create('background-color'),
    },
  }),
  { name: 'MainLayout' },
);
