import React from 'react';
import { Observable } from 'rxjs';
import { Redirect, Route, Switch } from 'react-router';

import { useSubscribable } from 'utils/react';

import { Loading } from '../Loading';

type Props = {
  isAuthorized$: Observable<boolean>;
  redirectTo: string;
  excludePath?: string;
  children?: React.ReactNode;
};

export const CheckAuthorization: React.FC<Props> = (props: Props) => {
  const { isAuthorized$, redirectTo, excludePath, children } = props;
  const isAuthorizedRD = useSubscribable(() => isAuthorized$, [isAuthorized$]);

  if (!children) {
    return null;
  }

  return (
    <Loading data={isAuthorizedRD}>
      {isAuthorized => (isAuthorized ? <>{children}</> : renderRedirect())}
    </Loading>
  );

  function renderRedirect() {
    return excludePath ? (
      <Switch>
        <Route path={excludePath} />
        <Redirect to={redirectTo} />
      </Switch>
    ) : (
      <Redirect to={redirectTo} />
    );
  }
};
