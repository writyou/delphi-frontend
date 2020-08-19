import { makeStyles } from 'utils/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.colors.athensGray : theme.colors.obsidian,
    },
  },

  main: {
    marginBottom: 60,
  },

  benefits: {
    [theme.breakpoints.up('tabletXS')]: {
      marginTop: 60,
    },
  },
}));

export { useStyles };
