import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      padding: 0,
      fontSize: 'inherit',

      minWidth: 42,
      minHeight: 20,
      [theme.breakpoints.up('tabletXS')]: {
        minWidth: 68,
        minHeight: 36,
      },
    },
  }),
  { name: 'AppButton' },
);
