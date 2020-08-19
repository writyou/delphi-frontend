import React from 'react';
import { Observable } from 'rxjs';
import { Redirect, Route, Switch } from 'react-router';

import { useSubscribable } from 'utils/react';

import { Loading } from '../Loading';

type IProps = {
  isAuthorized$: Observable<boolean>;
  redirectTo: string;
  excludePath?: string;
  children?: React.ReactNode;
};

export const CheckAuthorization: React.FC<IProps> = (props: IProps) => {
  const { isAuthorized$, redirectTo, excludePath, children } = props;
  const [isWorthyToWatch, isWorthyToWatchMeta] = useSubscribable(
    () => {
      // eslint-disable-next-line no-console
      isAuthorized$.subscribe(x => console.log(x));
      return isAuthorized$;
    },
    [],
    null,
  );

  return children ? (
    <Loading meta={isWorthyToWatchMeta}>{renderContent()}</Loading>
  ) : (
    <>{renderContent()}</>
  );

  function renderContent() {
    return isWorthyToWatch ? children : renderRedirect();
  }

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
