import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { ChevronDownIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ModeToggle } from './theme-toggle';
import { routes } from '@/config/routes';

export function Header() {
  const navigate = useNavigate();

  const { isPending, data } = auth.useSession();

  const handleSignOut = async () => {
    await auth.signOut();
    navigate(routes.home);
  };

  return (
    <header className="border-sidebar-border bg-sidebar flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <ModeToggle />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            disabled={isPending || !data?.user}
          >
            {data?.user && data.user.name}
            {data?.user && (
              <span className="text-muted-foreground text-xs">
                ({data.user.email})
              </span>
            )}
            <ChevronDownIcon aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleSignOut}>
            Desconectar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
