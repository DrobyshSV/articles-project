import React, { Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

const AppRouter = () => {
  const isAuth = useSelector(getUserAuthData);

  const routes = useMemo(() => Object.values(routerConfig).filter((route) => {
    if (route.authOnly && !isAuth) {
      return false;
    }

    return true;
  }), [isAuth]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {
          routes.map(({ element, path }) => (
            <Route
              key={path}
              path={path}
              element={(
                <div className="page-wrapper">
                  {element}
                </div>
              )}
            />
          ))
        }
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
