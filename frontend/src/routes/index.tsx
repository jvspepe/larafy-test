import { createBrowserRouter } from 'react-router';
import { Home } from '@/pages/home';
import { SignIn } from '@/pages/sign-in';
import { SignUp } from '@/pages/sign-up';
import { Dashboard } from '@/pages/dashboard';

export const router = createBrowserRouter([
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
    path: '/dashboard',
    element: <Dashboard />,
  },
]);
