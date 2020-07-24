import * as React from 'react';
import { Switch, Route } from 'react-router';

import { DcaPool } from 'app/pages';

import { MainLayout, Content } from './components';

export function App() {
  return (
    <Switch>
      <Route exact path="/" component={DcaPool} />
      <Route path="*">
        <MainLayout Content={Content} />
      </Route>
    </Switch>
  );
}
