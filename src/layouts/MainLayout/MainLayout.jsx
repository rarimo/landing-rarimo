import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppBar from '@/components/AppBar';
import AppFooter from '@/components/AppFooter';

const MainLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="application js-application">
      <AppBar />

      <main>
        <h1 className="visually-hidden">{t('app.title')}</h1>
        <Outlet />
      </main>

      <AppFooter />
    </div>
  );
};

export default MainLayout;
