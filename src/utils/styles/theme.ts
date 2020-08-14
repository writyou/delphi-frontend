import { createMuiTheme, Theme } from '@material-ui/core/styles';
import {
  getTheme as createTheme,
  makeGradient,
  colors,
  generateGridSpacingOverrides,
} from '@akropolis-web/styles';

const defaultTheme = createMuiTheme();

function getGradients(type: 'dark' | 'light') {
  return {
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
  };
}

export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');

function getTheme(type: 'light' | 'dark'): Theme {
  return createTheme(type, {
    // TODO: Package theme options are not merged with ThemeOptionsOverrides properly. Fix this TS issue in @akropolis-web/styles
    gradients: getGradients(type) as any,
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
    overrides: {
      MuiDrawer: {
        paper: {
          display: 'block',
          width: defaultTheme.spacing(60),
          padding: defaultTheme.spacing(4, 5),
        },
      },

      MuiGrid: {
        ...generateGridSpacingOverrides(defaultTheme.spacing),
      },

      // TODO: Check if MuiBackdrop options can be moved to @akropolis-web/styles
      MuiBackdrop: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
        },
      },
    },
  });
}

declare module '@akropolis-web/styles/dist/theme' {
  interface ThemeOverrides {
    gradients: ReturnType<typeof getGradients>;
  }

  interface ThemeOptionsOverrides {
    gradients: ReturnType<typeof getGradients>;
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
