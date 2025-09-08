import { Navigate, Outlet } from 'react-router';
import { auth } from '@/lib/auth';

export function GuestOnly() {
  const { data: session, isPending } = auth.useSession();

  if (isPending) return <p>Loading...</p>;

  if (session)
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  return <Outlet />;
}
