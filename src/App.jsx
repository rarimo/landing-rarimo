import { useEffect } from 'react';

import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS } from '@/const';
import { AppContextProvider, RouteLocationProvider } from '@/context';
import useViewportSizes from '@/hooks/useViewportSizes';
import { defineDesktopFontSizes, hideLoader, initAOS } from '@/js';
import AppRoutes from '@/router/routes';

const App = () => {
  useViewportSizes();

  const setup = () => {
    setTimeout(() => {
      hideLoader();
      defineDesktopFontSizes();
      initAOS();
    }, CONFIG.initLoaderDelay);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <div id={COMPONENT_NODE_IDS.application} className="application">
      <RouteLocationProvider>
        <AppContextProvider>
          <AppRoutes />
        </AppContextProvider>
      </RouteLocationProvider>
    </div>
  );
};

export default App;
