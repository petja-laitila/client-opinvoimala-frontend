import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Redirect,
  Route as RouterRoute,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import appRoutes, { Route } from './routes';
import ScrollToTop from './ScrollToTop';
import { useStore } from '../store/storeContext';

interface Props {
  routes?: Route[];
}

const AppRouter: FC<Props> = observer(({ routes = appRoutes, children }) => {
  const {
    auth: { isLoggedIn },
  } = useStore();

  const publicRoutes = routes.filter(({ isPublic }) => isPublic);

  const allowedRoutes = isLoggedIn ? routes : publicRoutes;

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        {allowedRoutes.map(route => (
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
