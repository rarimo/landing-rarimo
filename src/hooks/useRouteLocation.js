import { useContext } from 'react';

import { routeLocationContext } from '@/context';

const useRouteLocationContext = () => useContext(routeLocationContext);

export default useRouteLocationContext;
