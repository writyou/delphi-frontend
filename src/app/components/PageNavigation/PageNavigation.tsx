import * as React from "react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

import { routes } from "app/routes";
import { TabsList, TabContext, Tab } from "components";

function PageNavigation() {
  const match = useRouteMatch<{ page: string }>("/:page");

  const page = match ? match.params.page : routes.summary.getElementKey();

  return (
    <TabContext value={page}>
      <TabsList value={page}>
        <Tab
          label="My Summary"
          component={Link}
          value={routes.summary.getElementKey()}
          to={routes.summary.getRedirectPath()}
        />

        <Tab
          label="Savings"
          component={Link}
          value={routes.summary.getElementKey()}
          to={routes.summary.getRedirectPath()}
        />

        <Tab
          label="Investing"
          component={Link}
          value={routes.summary.getElementKey()}
          to={routes.summary.getRedirectPath()}
        />

        <Tab
          label="Wiki"
          component={Link}
          value={routes.summary.getElementKey()}
          to={routes.summary.getRedirectPath()}
        />
      </TabsList>
    </TabContext>
  );
}

export { PageNavigation };
