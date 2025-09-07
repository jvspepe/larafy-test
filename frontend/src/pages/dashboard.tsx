import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { useNavigate } from 'react-router';

export function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await auth.signOut();
    void navigate('/');
  };

  return (
    <div>
      <Button
        onClick={void handleSignOut}
        type="button"
      >
        Sair
      </Button>
    </div>
  );
}
