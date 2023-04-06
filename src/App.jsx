import RouteLocationProvider from '@/providers/RouteLocationProvider';
import AppRoutes from '@/router/routes';
import { useEffect, useState } from 'react';
import { defineDesktopFontSizes, hideLoader, initAOS } from '@/js';
import { CONFIG } from '@/config';
import { AppContextProvider } from '@/context';

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
