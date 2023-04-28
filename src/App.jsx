import { useEffect, useState } from 'react';

import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS } from '@/const';
import { AppContextProvider, RouteLocationProvider } from '@/context';
import { defineDesktopFontSizes, hideLoader } from '@/js';
import AppRoutes from '@/router/routes';

const App = () => {
  const [isInited, setIsInited] = useState(false);

  const setup = () => {
    setTimeout(() => {
      hideLoader();
      defineDesktopFontSizes();
      setIsInited(true);
    }, CONFIG.initLoaderDelay);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <div
      id={COMPONENT_NODE_IDS.application}
      className="application"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <RouteLocationProvider>
        <AppContextProvider isInited={isInited}>
          <AppRoutes />
        </AppContextProvider>
      </RouteLocationProvider>
    </div>
  );
};

export default App;
