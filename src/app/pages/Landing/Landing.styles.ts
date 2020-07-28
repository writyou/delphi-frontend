import { makeStyles } from 'utils/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.colors.athensGray : theme.colors.obsidian,
    },
  },

  main: {
    marginBottom: 90,
  },

  benefits: {
    marginTop: 60,
  },
}));

export { useStyles };
