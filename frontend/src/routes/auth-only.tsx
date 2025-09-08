import { Navigate, Outlet } from 'react-router';
import { auth } from '@/lib/auth';

export function AuthOnly() {
  const { data: session, isPending } = auth.useSession();

  if (isPending) return <p>Loading...</p>;

  if (!session)
    return (
      <Navigate
        to="/sign-in"
        replace
      />
    );

  return <Outlet />;
}
