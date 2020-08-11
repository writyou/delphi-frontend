declare module 'filemanager-webpack-plugin';
declare module 'react-jazzicon' {
  export function jsNumberForAddress(address: string): number;
}

declare module 'mersennetwister' {
  class MersenneTwister {
    constructor(seed: number);

    random(): number;
  }

  // eslint-disable-next-line import/no-default-export
  export default MersenneTwister;
}

interface Window {
  __PRERENDER_INJECTED__?: {
    isServer: boolean;
  };
}

declare module '*.woff' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}

declare module '*.woff2' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}

declare module '*.ttf' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}

declare module '*.svg' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}

declare module '*.pdf' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}

declare module '*.png' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}
