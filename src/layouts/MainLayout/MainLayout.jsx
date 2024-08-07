import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

import AppBar from '@/components/AppBar';
import AppFooter from '@/components/AppFooter';
import RouteTransition from '@/components/RouteTransition';
import { CONFIG } from '@/config';
import useNavigation from '@/hooks/useNavigation';
import { checkAnchors } from '@/js';

const MainLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { handleNavClick } = useNavigation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        handleNavClick({ hash: true, path: checkAnchors(location.hash) });
      }, CONFIG.initLoaderDelay);
    }
  }, []);
  return (
    <>
      <AppBar />

      <RouteTransition>
        <main>
          <h1 className="visually-hidden">{t('app.title')}</h1>
          <Outlet />
        </main>
      </RouteTransition>

      <AppFooter />
    </>
  );
};

export default memo(MainLayout);
