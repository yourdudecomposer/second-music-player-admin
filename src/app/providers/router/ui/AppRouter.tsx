import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { TablePage } from '@/pages/TablePage';

export function AppRouter() {
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
        <TablePage />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
