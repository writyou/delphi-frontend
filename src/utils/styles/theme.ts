import { createMuiTheme, Theme } from '@material-ui/core/styles';

import { colors } from 'utils/styles/colors';

import {
  helveticaNeueBold,
  helveticaNeueBoldItalic,
  helveticaNeueCondensedBlack,
  helveticaNeueCondensedBold,
  helveticaNeueItalic,
  helveticaNeueLight,
  helveticaNeueLightItalic,
  helveticaNeueMedium,
  helveticaNeueMediumItalic,
  helveticaNeueThin,
  helveticaNeueThinItalic,
  helveticaNeueUltraLight,
  helveticaNeueUltraLightItalic,
  helveticaNeue,
} from './fonts';
import { makeGradient } from './makeGradient';
import { generateGridSpacingOverrides } from './generateGridSpacingOverrides';

export { Theme };

const defaultTheme = createMuiTheme();

function getGradients(type: 'dark' | 'light') {
  return {
    main: makeGradient([colors.heliotrope, colors.royalBlue]),
    products: [
      makeGradient(
        type === 'dark' ? [colors.jacarta, colors.blueZodiac] : [colors.zumthor2, colors.linkWater],
      ),
      makeGradient(
        type === 'dark' ? [colors.jacarta2, colors.bunting] : [colors.whisper, colors.blueChalk],
      ),
      makeGradient(
        type === 'dark' ? [colors.bossanova, colors.valhalla] : [colors.snuff, colors.amour],
      ),
    ] as const,
    button: makeGradient([
      colors.heliotrope,
      colors.royalBlue,
      colors.heliotrope2,
      colors.heliotrope,
    ]),
    outlinedButton: makeGradient([
      { color: colors.heliotrope, offset: '0%' },
      { color: colors.royalBlue, offset: '33.3%' },
      { color: colors.heliotrope, offset: '100%' },
    ]),
    landingIcon: makeGradient(
      type === 'dark'
        ? [colors.northWesternPurple, colors.darkPurple]
        : [colors.blushPink2, colors.lavender],
    ),
    landingText: makeGradient([colors.lilac, colors.grape]),
    poolBalanceChart: [
      makeGradient(['#fc87e2', '#f24cb6']),
      makeGradient(['#63afdd', '#574cf2']),
    ] as const,
    poolCompositionChart: [
      makeGradient(['#63f8b3', '#dcff9c']),
      makeGradient(['#e323ff', '#7517f8']),
      makeGradient(['#639ff8', '#85f9e1']),
      makeGradient(['#7d40ff', '#02a4ff']),
      makeGradient(['#f985f5', '#f863dd']),
    ] as const,
    progressChart: makeGradient(['#7d40ff', '#02a4ff']),
  };
}

const lightPalette = {
  primary: {
    main: colors.purpleHeart,
    light: colors.heliotrope,
    dark: colors.mediumPurple,
    contrastText: colors.white,
  },
  secondary: {
    main: colors.electricViolet,
    light: colors.electricViolet,
    dark: colors.electricViolet,
    contrastText: colors.electricViolet,
  },
  text: {
    primary: colors.black,
  },
  error: {
    main: colors.monza,
  },
  background: {
    hint: colors.charade,
    default: colors.athensGray,
    paper: colors.white,
    paperSecondary: colors.white,
  },
  type: 'light' as const,
};

export const darkPalette = {
  primary: {
    main: colors.purpleHeart,
    light: colors.heliotrope,
    dark: colors.mediumPurple,
    contrastText: colors.white,
  },
  secondary: {
    main: colors.electricViolet,
    light: colors.electricViolet,
    dark: colors.electricViolet,
    contrastText: colors.electricViolet,
  },
  text: {
    primary: colors.white,
  },
  error: {
    main: colors.monza,
  },
  background: {
    hint: colors.charade,
    default: colors.obsidian,
    paper: colors.foggyNight,
    paperSecondary: colors.darkBlueMagenta,
  },
  type: 'dark' as const,
};

export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');

function getTheme(type: 'light' | 'dark'): Theme {
  return createMuiTheme({
    colors,
    gradients: getGradients(type),
    palette: type === 'light' ? lightPalette : darkPalette,
    breakpoints: {
      keys: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'desktopXL',
        'desktopLG',
        'desktopMD',
        'desktopSM',
        'desktopXS',
        'tabletSM',
        'tabletXS',
        'mobileSM',
        'mobileXS',
      ],
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
        desktopXL: 2560,
        desktopLG: 1920,
        desktopMD: 1440,
        desktopSM: 1360,
        desktopXS: 1280,
        tabletSM: 1024,
        tabletXS: 768,
        mobileSM: 414,
        mobileXS: 0,
      },
    },
    typography: {
      fontFamily: ['"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
      h6: {
        fontSize: 16,
        fontWeight: 400,
      },
    },
    shape: {
      borderRadius: 4,
    },
    overrides: {
      MuiDrawer: {
        paper: {
          display: 'block',
          width: defaultTheme.spacing(60),
          padding: defaultTheme.spacing(4, 5),
          backgroundColor: type === 'dark' ? colors.blackCurrant : colors.white,
        },
      },
      MuiPaper: {
        root: {
          transition: defaultTheme.transitions.create(['background-color', 'box-shadow']),
        },
      },
      MuiLink: {
        underlineHover: {
          textDecoration: 'underline',
          textDecorationColor: type === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',

          '&:hover': {
            textDecorationColor: 'inherit',
          },
        },
      },
      MuiCssBaseline: {
        '@global': {
          '@font-face': [
            helveticaNeueBold,
            helveticaNeueBoldItalic,
            helveticaNeueCondensedBlack,
            helveticaNeueCondensedBold,
            helveticaNeueItalic,
            helveticaNeueLight,
            helveticaNeueLightItalic,
            helveticaNeueMedium,
            helveticaNeueMediumItalic,
            helveticaNeueThin,
            helveticaNeueThinItalic,
            helveticaNeueUltraLight,
            helveticaNeueUltraLightItalic,
            helveticaNeue,
          ],
          html: {
            boxSizing: 'border-box',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontSize: 16,
            fontFamily: 'helvetica, sans-serif',
          },

          body: {
            margin: 0,
            fontSize: '1rem',
            transition: defaultTheme.transitions.create('background-color'),
            overflow: 'hidden',
          },

          'html, body, #root': {
            height: '100%',
          },

          '#root': {
            zIndex: 1,
            position: 'relative',
          },

          '*, *::before, *::after': {
            boxSizing: 'inherit',
          },

          '@media print': {
            body: {
              backgroundColor: '#fff',
            },
          },

          '#walletconnect-wrapper': {
            zIndex: defaultTheme.zIndex.modal,
            position: 'relative',
          },
        },
      },

      MuiButton: {
        endIcon: {
          '&:empty': {
            display: 'none',
          },
        },

        startIcon: {
          '&:empty': {
            display: 'none',
          },
        },
      },

      MuiExpansionPanelSummary: {
        root: {
          '&$expanded': {
            minHeight: defaultTheme.spacing(6),
          },
        },

        content: {
          '&$expanded': {
            margin: defaultTheme.spacing(1.5, 0),
          },
        },
      },

      MuiGrid: {
        ...generateGridSpacingOverrides(defaultTheme.spacing),
      },

      MuiSnackbarContent: {
        root: {
          backgroundColor: '#fff',
        },
        message: {
          color: colors.rhino,
        },
      },

      MuiFormControlLabel: {
        root: {
          marginRight: 0,
        },
      },

      MuiSvgIcon: {
        root: {
          display: 'block',
          fontSize: '1.25rem',
        },

        fontSizeSmall: {
          fontSize: '1rem',
        },

        fontSizeLarge: {
          fontSize: '1.5rem',
        },
      },

      MuiOutlinedInput: {
        root: {
          borderColor: colors.darkMist,
          borderRadius: 8,
          minHeight: 36,

          '&$focused': {
            background: colors.blackRussian,
          },

          '&$disabled': {
            color: 'rgba(255, 255, 255, 0.2)',
          },

          '&$error': {
            borderColor: '#643d3d',
          },
        },

        adornedEnd: {
          paddingRight: 0,
        },

        input: {
          fontWeight: 300,
          padding: '8px 11px',

          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
        },

        notchedOutline: {
          borderColor: 'inherit !important',
          borderWidth: '1px !important',
        },
      },

      MuiFormHelperText: {
        root: {
          fontWeight: 300,

          '&$error': {
            margin: '5px 0 0',
          },
        },
      },

      MuiMenuItem: {
        root: {
          fontWeight: 300,
          padding: '10px 9px',

          '&$selected, &$selected:hover': {
            backgroundColor: colors.blackRussian,
          },

          '&:hover': {
            backgroundColor: colors.darkMist,
          },
        },
      },

      MuiSelect: {
        root: {
          overflow: 'hidden',

          '&$select:focus': {
            backgroundColor: colors.blackRussian,
          },

          '&:hover:not($disabled)': {
            backgroundColor: colors.blackRussian,
          },
        },
      },

      MuiBackdrop: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
        },
      },
    },
  });
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors: typeof colors;
    gradients: ReturnType<typeof getGradients>;
  }

  interface ThemeOptions {
    colors: typeof colors;
    gradients: ReturnType<typeof getGradients>;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    hint: string;
    tableHeader: string;
    paperSecondary: string;
  }
}

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    desktopXL: true;
    desktopLG: true;
    desktopMD: true;
    desktopSM: true;
    desktopXS: true;
    tabletSM: true;
    tabletXS: true;
    mobileSM: true;
    mobileXS: true;
  }
}
