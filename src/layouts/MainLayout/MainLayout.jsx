import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      Layout
      <Outlet />
    </div>
  );
};

export default MainLayout;
