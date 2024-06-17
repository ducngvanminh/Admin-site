import Welcome from '../../pages/Welcome/welcome';
import { AppLayout } from '../app';
import { Outlet, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const router = useLocation();
  return (
    <AppLayout>
      <Outlet />
      {router.pathname === '/' && <Welcome />}
    </AppLayout>
  );
};

export default DashboardLayout;
