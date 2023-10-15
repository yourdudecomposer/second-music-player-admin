import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { TablePage } from '@/pages/TablePage';
import { useSelector } from 'react-redux';
import { isLogged } from '@/features/Auth';

export function AppRouter() {
  const isLog = useSelector(isLogged);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <LoginPage />

      ),
    },
    {
      path: '/table',
      element: (
        isLog ? <TablePage /> : <Navigate to="/" />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
