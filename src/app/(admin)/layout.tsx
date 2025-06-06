'use client';

import { usePathname } from 'next/navigation';

import { Menu } from 'lucide-react';

import { AppSidebar, TopMenu } from 'widgets';
import { ProtectedRoute } from 'shared/lib';
import { Separator, SidebarProvider, SidebarTrigger } from 'shared/ui';

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/orders':
      return 'Orders';

    case '/cart':
      return 'Cart';

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
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear">
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
            <div className="flex-1" />
            <TopMenu className="px-4" />
          </header>
          <div className="flex flex-col gap-4">{children}</div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
