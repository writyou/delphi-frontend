import React, { useMemo } from 'react';
import { map } from 'rxjs/operators';

import { CheckAuthorization } from 'components';
import { useApi } from 'services/api';

type Props = {
  redirectTo: string;
  excludePath?: string;
  children?: React.ReactNode;
};

export const IsUserConnected = (props: Props) => {
  const api = useApi();

  const isUserConnected$ = useMemo(
    () => api.web3Manager.account$.pipe(map(account => account !== null)),
    [api],
  );

  return <CheckAuthorization isAuthorized$={isUserConnected$} {...props} />;
};
