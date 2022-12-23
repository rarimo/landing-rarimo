import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES_PATHS } from '@/const';
import useRouteLocationContext from '@/hooks/useRouteLocation';
import MainLayout from '@/layouts/MainLayout';

const HomePage = lazy(() => import('@/pages/HomePage'));
const TestnetPage = lazy(() => import('@/pages/TestnetPage'));

const AppRoutes = () => {
  const { displayLocation } = useRouteLocationContext();

  useEffect(() => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }, [displayLocation]);

  return (
    <Suspense fallback={<></>}>
      <Routes location={displayLocation}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES_PATHS.home} element={<HomePage />} />
          <Route path={ROUTES_PATHS.testnet} element={<TestnetPage />} />

          <Route
            path="*"
            element={
              <Navigate
                replace
                to={ROUTES_PATHS.home}
                state={{ isRedirect: true }}
              />
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
