// import RouteLocationProvider from '@/providers/RouteLocationProvider';
import AppRoutes from '@/router/routes';
import { useEffect } from 'react';
import { defineDesktopFontSizes, hideLoader, initAOS, initSwiper } from '@/js';

const App = () => {
  const setup = () => {
    setTimeout(() => {
      // hideLoader();
      defineDesktopFontSizes();
      initAOS();
      initSwiper();
    }, 500);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="App">
      {/* <RouteLocationProvider> */}
      <AppRoutes />
      {/* </RouteLocationProvider> */}
    </div>
  );
};

export default App;
