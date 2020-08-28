import * as packageJson from '../../package.json';

export type Mode = 'sandbox' | 'rinkeby' | 'kovan' | 'mainnet' | 'pre-mainnet';

export function getEnv() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const mode: Mode = (process.env.MODE as Mode | undefined) || 'rinkeby';
  const forGhPages = true;
  const appVersion = packageJson.version;
  const withHot = !!module.hot && isDevelopment;
  const isMockServer = false;

  return {
    isProduction,
    isDevelopment,
    mode,
    forGhPages,
    withHot,
    appVersion,
    isMockServer,
  };
}
