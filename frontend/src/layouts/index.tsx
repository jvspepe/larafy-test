import { Outlet } from 'react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '@/components/header';

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex max-h-dvh grow flex-col overflow-hidden">
        <Header />
        <div className="overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
