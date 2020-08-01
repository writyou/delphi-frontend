import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { Landing } from 'app/pages';

import { MainLayout } from './components';
import { routes } from './routes';
import * as pages from './pages';

export function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="*">
        <MainLayout>
          <Switch>
            {process.env.NODE_ENV !== 'production' && (
              <Route exact path={routes.demo.getRoutePath()} component={pages.DemoPage} />
            )}
            <Route path={routes.summary.getRoutePath()} component={pages.Summary} />
            <Route
              exact
              path={routes.savings.pool.id.getRoutePath()}
              component={pages.SavingsPoolPage}
            />
            <Route path={routes.savings.getRoutePath()} component={pages.SavingsPage} />
            <Route path={routes.investing.getRoutePath()} component={pages.InvestingPage} />
            <Redirect to="/" />
          </Switch>
        </MainLayout>
      </Route>
    </Switch>
  );
}
