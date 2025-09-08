import { createBrowserRouter } from 'react-router';
import { Layout } from '@/layouts';
import { GuestOnly } from '@/routes/guest-only';
import { AuthOnly } from '@/routes/auth-only';
import { Home } from '@/pages/home';
import { SignIn } from '@/pages/sign-in';
import { SignUp } from '@/pages/sign-up';
import { Users } from '@/pages/users';
import { SpreadsheetDetails } from '@/pages/spreadsheet-details';
import { Dashboard } from '@/pages/dashboard';
import { ForgotPassword } from '@/pages/forgot-password';
import { ResetPassword } from '@/pages/reset-password';

export const router = createBrowserRouter([
  {
    element: <GuestOnly />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <AuthOnly />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/spreadsheets',
            element: <Dashboard />,
          },
          {
            path: '/users',
            element: <Users />,
          },

          {
            path: '/spreadsheets/:tableId',
            element: <SpreadsheetDetails />,
          },
        ],
      },
    ],
  },
]);
