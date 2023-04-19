import { useEffect, useState } from 'react';

import { CONFIG } from '@/config';
import { AppContextProvider } from '@/context';
import { defineDesktopFontSizes, hideLoader, initAOS } from '@/js';
import RouteLocationProvider from '@/providers/RouteLocationProvider';
import AppRoutes from '@/router/routes';

const App = () => {
  const [isInited, setIsInited] = useState(false);

  const setup = () => {
    setTimeout(() => {
      hideLoader();
      defineDesktopFontSizes();
      // initAOS();
      setIsInited(true);
    }, CONFIG.initLoaderDelay);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="application js-application">
      <RouteLocationProvider>
        <AppContextProvider isInited={isInited}>
          <AppRoutes />
        </AppContextProvider>
      </RouteLocationProvider>
    </div>
  );
};

export default App;
