import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { routes } from '../../routes';
import * as pages from '../../pages';

export const Content: React.FC = () => {
  return (
    <Switch>
      {process.env.NODE_ENV !== 'production' && (
        <Route exact path={routes.demo.getRoutePath()} component={pages.DemoPage} />
      )}
      <Route path={routes.summary.getRoutePath()} component={pages.SummaryPage} />
      <Route path={routes.summaryEmpty.getRoutePath()} component={pages.SummaryEmptyPage} />
      <Route path={routes.savings.getRoutePath()} component={pages.SavingsPage} />
      <Route path={routes.investing.getRoutePath()} component={pages.InvestingPage} />
      <Redirect to="/" />
    </Switch>
  );
};
