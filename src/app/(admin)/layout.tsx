'use client';

import { usePathname } from 'next/navigation';

import { Menu } from 'lucide-react';

import { AppSidebar } from 'widgets';
import { Separator, SidebarProvider, SidebarTrigger } from 'shared/ui';

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/dashboard':
      return 'Dashboard';

    case '/orders':
      return 'Orders';

    case '/products':
      return 'Products';

    default:
      return 'Admin';
  }
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-2">
              <Menu />
            </SidebarTrigger>
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4"
            />
            <h1 className="text-2xl font-bold">{pageTitle}</h1>
          </div>
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
