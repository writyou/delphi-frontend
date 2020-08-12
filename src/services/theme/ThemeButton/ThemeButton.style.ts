import { makeStyles, ProvidedAncestorBackground } from 'utils/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    backgroundImage: theme.gradients.main.linear('to right'),

    minHeight: theme.spacing(4.5),
    borderRadius: theme.spacing(2.25),
    padding: theme.spacing(0.75, 1.75),

    '&$sizeSmall': {
      minHeight: theme.spacing(2.5),
      borderRadius: theme.spacing(1.25),
      padding: theme.spacing(0.25, 1.25),
    },

    '&:hover, &$focusVisible': {
      zIndex: 1,
      color: theme.colors.royalBlue,
    },
  },

  backdrop: {
    position: 'absolute',
    top: 2,
    right: 2,
    bottom: 2,
    left: 2,
    borderRadius: theme.spacing(2),
    backgroundColor: ({ backgroundColor }: ProvidedAncestorBackground) => backgroundColor,
    opacity: 1,
    transition: theme.transitions.create(['opacity', 'background-color']),

    '$root$sizeSmall &': {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1,
      borderRadius: theme.spacing(1.125),
    },
  },

  icons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
  },

  icon: {
    display: 'flex',
    marginRight: theme.spacing(1.25),
    fontSize: theme.spacing(3),
    transition: theme.transitions.create('color'),
    color: theme.palette.type === 'light' ? theme.colors.shark : theme.colors.alto,

    '$root:hover &, $root$focusVisible &': {
      color: theme.colors.royalBlue,
    },

    '$root$sizeSmall &': {
      fontSize: theme.spacing(2),
    },

    '&:last-child': {
      marginRight: 0,
    },
  },

  sizeSmall: {},
  focusVisible: {},
}));
