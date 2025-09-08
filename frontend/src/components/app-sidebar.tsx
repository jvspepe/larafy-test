import { Link } from 'react-router';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { SheetIcon, UserIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { routes } from '@/config/routes';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Larafy Teste</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  size="lg"
                >
                  <Link to={routes.users}>
                    <UserIcon aria-hidden />
                    Usuários
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  size="lg"
                >
                  <Link to={routes.dashboard}>
                    <SheetIcon aria-hidden />
                    Tabelas
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Link
          to="https://github.com/jvspepe/larafy-test"
          target="_blank"
          className="text-muted-foreground hover:text-primary flex w-fit items-center gap-2 text-xs transition-colors duration-200"
        >
          <SiGithub
            aria-hidden
            className="size-4"
          />
          Feito por João Victor
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
