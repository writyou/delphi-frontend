import React from "react";
import { Switch, Route, Redirect } from "react-router";

import { routes } from "../../routes";
import * as pages from "../../pages";

export const Content: React.FC = () => {
  return (
    <Switch>
      {process.env.NODE_ENV !== "production" && (
        <Route
          exact
          path={routes.demo.getRoutePath()}
          component={pages.DemoPage}
        />
      )}
      <Route
        path={routes.summary.getRoutePath()}
        component={pages.SummaryPage}
      />
      <Route
        exact
        path={routes.savings.getRoutePath()}
        component={makeUnimplementedComponent("Savings")}
      />
      <Route
        exact
        path={routes.investing.getRoutePath()}
        component={makeUnimplementedComponent("Investing")}
      />

      <Redirect to="/" />
    </Switch>
  );
};

function makeUnimplementedComponent(componentLabel: string) {
  return () => (
    <div style={{ fontSize: 45 }}>{`${componentLabel} not implemented`}</div>
  );
}
