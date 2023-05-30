import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import RouteTransition from '@/components/RouteTransition';
import { ROUTES_PATHS } from '@/const';
import useRouteLocationContext from '@/hooks/useRouteLocation';
import MainLayout from '@/layouts/MainLayout';

const HomePage = lazy(() => import('@/pages/HomePage'));
// const TestnetPage = lazy(() => import('@/pages/TestnetPage'));
const NftCheckoutPage = lazy(() => import('@/pages/NftCheckoutPage'));
const TestnetSignUpPage = lazy(() => import('@/pages/TestnetSignUpPage'));

const AppRoutes = () => {
  const { displayLocation } = useRouteLocationContext();

  const routes = [
    {
      element: <MainLayout />,
      path: ROUTES_PATHS.home,
      children: [
        {
          element: <HomePage />,
          index: true,
        },
        // {
        //   path: ROUTES_PATHS.testnet,
        //   element: <TestnetPage />,
        // },
        {
          path: ROUTES_PATHS.nftCheckout,
          element: <NftCheckoutPage />,
        },
      ],
    },
    {
      path: ROUTES_PATHS.testnetSignUp,
      element: (
        <RouteTransition>
          <main>
            <TestnetSignUpPage />
          </main>
        </RouteTransition>
      ),
    },
    {
      path: '*',
      element: (
        <Navigate replace to={ROUTES_PATHS.home} state={{ isRedirect: true }} />
      ),
    },
  ];

  const renderRoutes = useRoutes(routes, displayLocation);

  return <Suspense fallback={<></>}>{renderRoutes}</Suspense>;
};

export default AppRoutes;
