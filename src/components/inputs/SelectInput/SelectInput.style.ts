import { makeStyles } from 'utils/styles';

export const useStyles = makeStyles(
  theme => ({
    root: {
      minWidth: 129,

      '&$isOpen $input': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        '& $arrowIcon': {
          transform: 'rotate(-90deg)',
        },
      },

      '&$withSingleOption': {
        minWidth: 100,

        '& $input': {
          backgroundColor: 'inherit',
          borderColor: 'transparent',
          color: '#fff',
        },

        '& $arrowIcon': {
          display: 'none',
        },
      },
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '0 0 8px 8px',
      borderColor: theme.colors.darkMist,
      borderTop: 'none',
    },
    arrowIcon: {
      position: 'absolute',
      right: 0,
      padding: 8,
      fontSize: 18,
      transform: 'rotate(90deg)',
      pointerEvents: 'none',
      transition: '1s',
    },
    isOpen: {},
    withSingleOption: {},
    input: {},
  }),
  { name: 'SelectInput' },
);
