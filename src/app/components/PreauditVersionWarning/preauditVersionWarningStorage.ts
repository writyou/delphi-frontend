import { Storage, localStorageAdapter } from 'services/storage';

interface State {
  isHidden: boolean;
}

export const preauditVersionWarningStorage = new Storage<[State]>(
  'preauditVersionWarning',
  localStorageAdapter,
  {
    isHidden: false,
  },
  [],
);
