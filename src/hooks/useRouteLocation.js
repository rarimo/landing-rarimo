import { useContext } from 'react';

import { routeLocationContext } from '@/providers/RouteLocationProvider';

const useRouteLocationContext = () => useContext(routeLocationContext);

export default useRouteLocationContext;
