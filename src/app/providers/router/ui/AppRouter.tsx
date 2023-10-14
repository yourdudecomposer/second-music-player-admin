import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { TablePage } from '@/pages/TablePage';

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

export function AppRouter() {
  return <RouterProvider router={router} />;
}
