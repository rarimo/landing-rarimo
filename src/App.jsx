import RouteLocationProvider from '@/providers/RouteLocationProvider';
import AppRoutes from '@/router/routes';
import { useEffect } from 'react';
import { defineDesktopFontSizes, hideLoader, initAOS } from '@/js';
import { CONFIG } from '@/config';

const App = () => {
  const setup = () => {
    setTimeout(() => {
      hideLoader();
      defineDesktopFontSizes();
      // initAOS();
    }, CONFIG.initLoaderDelay);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="application js-application">
      <RouteLocationProvider>
        <AppRoutes />
      </RouteLocationProvider>
    </div>
  );
};

export default App;
