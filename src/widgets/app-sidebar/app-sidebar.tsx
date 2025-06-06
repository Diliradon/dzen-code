'use client';

import * as React from 'react';

import { Box, Home, LogOut, Package } from 'lucide-react';

import { useAuth } from 'shared/lib';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from 'shared/ui';

import { NavUser, SidebarNavItem } from './ui';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <Home size={16} className="min-w-4" />,
  },
  {
    name: 'Orders',
    href: '/orders',
    icon: <Package size={16} className="min-w-4" />,
  },
  {
    name: 'Products',
    href: '/products',
    icon: <Box size={16} className="min-w-4" />,
  },
];

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser
          user={{
            name: user?.name || 'User',
            email: user?.email || 'user@example.com',
            avatar: '/avatars/shadcn.jpg',
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        {navigation.map(navItem => (
          <SidebarNavItem key={navItem.name} {...navItem} />
        ))}
      </SidebarContent>
      <SidebarFooter className="flex-row items-center gap-4 text-nowrap p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-4 text-red-500 transition-colors hover:text-red-600"
        >
          <LogOut size={16} className="min-w-4" />
          <span>Log out</span>
        </button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
