import '@akropolis-web/styles/assets/fonts/HelveticaNeue/stylesheet.css';

export {
  CSSProperties,
  StyleRules,
  makeStyles,
  useTheme,
  lighten,
  darken,
  WithDarkTheme,
  generateGridSpacingOverrides,
  rgba,
  useAncestorBackgroundHack,
  AncestorBackgroundHackProvider,
  ProvidedAncestorBackground,
} from '@akropolis-web/styles';

export * from './theme'; // TODO: move theme and colors into styles package and import from there
export * from './colors';
