import { getTheme as createTheme, makeGradient, Theme, colors } from '@akropolis-web/styles';

import { colors as localColors } from './colors';

function getGradients(type: 'dark' | 'light') {
  return {
    landingIcon: makeGradient(
      type === 'dark'
        ? [localColors.northWesternPurple, colors.valhalla]
        : [localColors.blushPink2, localColors.lavender],
    ),
    landingText: makeGradient([localColors.lilac2, localColors.grape]),
    poolBalanceChart: [
      makeGradient(['#fc87e2', '#f24cb6']),
      makeGradient(['#63afdd', '#574cf2']),
    ] as const,
  };
}

const sizes = {
  chartWidth: {
    default: 135,
    xs: 60,
    sm: 85,
    md: 114,
    lg: 140,
    xl: 170,
  },
};

export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');

function getTheme(type: 'light' | 'dark'): Theme {
  return createTheme(type, {
    sizes,
    colors: localColors,
    gradients: getGradients(type),
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
        mobileMD: 414,
        mobileSM: 320,
        mobileXS: 0,
      },
    },
  });
}

declare module '@akropolis-web/styles/dist/theme' {
  interface ThemeOverrides {
    sizes: typeof sizes;
    colors: typeof localColors;
    gradients: ReturnType<typeof getGradients>;
  }

  interface ThemeOptionsOverrides {
    sizes: typeof sizes;
    colors: typeof localColors;
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
    mobileMD: true;
    mobileSM: true;
    mobileXS: true;
  }
}
