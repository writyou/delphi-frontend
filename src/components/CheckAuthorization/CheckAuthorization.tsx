import React from 'react';
import { Observable } from 'rxjs';
import { Redirect, Route, Switch } from 'react-router';

import { useSubscribableDeprecated } from 'utils/react';

import { DeprecatedLoading } from '../DeprecatedLoading';

type IProps = {
  isAuthorized$: Observable<boolean>;
  redirectTo: string;
  excludePath?: string;
  children?: React.ReactNode;
};

export const CheckAuthorization: React.FC<IProps> = (props: IProps) => {
  const { isAuthorized$, redirectTo, excludePath, children } = props;
  const [isWorthyToWatch, isWorthyToWatchMeta] = useSubscribableDeprecated(() => isAuthorized$, [
    isAuthorized$,
  ]);

  return (
    <DeprecatedLoading meta={isWorthyToWatchMeta} loader={!children ? <>{null}</> : undefined}>
      {renderContent()}
    </DeprecatedLoading>
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
