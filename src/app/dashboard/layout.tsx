import { Menu } from 'lucide-react';

import { SidebarProvider, SidebarTrigger } from 'shared/ui';
// eslint-disable-next-line no-restricted-imports
import { AppSidebar } from 'widgets/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        z
        <SidebarTrigger>
          <Menu />
        </SidebarTrigger>
        {children}
      </main>
    </SidebarProvider>
  );
}
