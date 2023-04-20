import RouteLocationProvider from '@/providers/RouteLocationProvider';
import AppRoutes from '@/router/routes';
import { useEffect, useState } from 'react';
import { defineDesktopFontSizes, hideLoader } from '@/js';
import { CONFIG } from '@/config';
import { AppContextProvider } from '@/context';

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
      className="application js-application"
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
