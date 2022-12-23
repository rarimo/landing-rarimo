import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppBar from '@/components/AppBar';
import AppFooter from '@/components/AppFooter';
import RouteTransition from '@/components/RouteTransition';

const MainLayout = () => {
  const { t } = useTranslation();

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

export default MainLayout;
