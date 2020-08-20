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
  const [isWorthyToWatch, isWorthyToWatchMeta] = useSubscribable(() => isAuthorized$, [
    isAuthorized$,
  ]);

  return (
    <Loading meta={isWorthyToWatchMeta} loader={!children ? <>{null}</> : undefined}>
      {renderContent()}
    </Loading>
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
