import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export function Home() {
  return (
    <div className="flex min-h-svh items-center justify-center gap-4">
      <Button asChild>
        <Link to="/sign-in">Conectar</Link>
      </Button>
      <Button asChild>
        <Link to="/sign-up">Criar Conta</Link>
      </Button>
    </div>
  );
}
