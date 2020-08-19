import React from 'react';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CheckAuthorization } from 'components';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';

type IProps = {
  redirectTo: string;
  excludePath?: string;
  children?: React.ReactNode;
};

export const IsUserConnected = (props: IProps) => {
  const api = useApi();

  const [isUserConnected$] = useSubscribable(
    () => api.web3Manager.account$.pipe(map(account => of(account !== null))),
    [],
    of(false),
  );

  return <CheckAuthorization isAuthorized$={isUserConnected$} {...props} />;
};
