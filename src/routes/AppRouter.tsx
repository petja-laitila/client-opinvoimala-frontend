import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Redirect,
  Route as RouterRoute,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import appRoutes, { Route } from './routes';

interface Props {
  routes?: Route[];
}

const AppRouter: FC<Props> = observer(({ routes = appRoutes, children }) => {
  // TODO: Add some authentication logic here
  const publicRoutes = routes.filter(({ isPublic }) => isPublic);

  return (
    <Router>
      <Switch>
        {publicRoutes.map(route => (
          <RouterRoute
            key={route.path}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}
        <Redirect to={`/`} />
        {children}
      </Switch>
    </Router>
  );
});

export default AppRouter;
