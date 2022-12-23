import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES_PATHS } from '@/const';
// import useRouteLocationContext from '@/hooks/useRouteLocation';
import MainLayout from '@/layouts/MainLayout';

const HomePage = lazy(() => import('@/pages/HomePage'));

const AppRoutes = () => {
  // const { displayLocation } = useRouteLocationContext();

  return (
    <Suspense fallback={<></>}>
      {/* <Routes location={displayLocation}> */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES_PATHS.home} element={<HomePage />} />

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
