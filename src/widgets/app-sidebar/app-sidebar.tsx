'use client';

import * as React from 'react';

import Link from 'next/link';

import { Box, Home, Package } from 'lucide-react';

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
}: React.ComponentProps<typeof Sidebar>) => (
  <Sidebar collapsible="icon" {...props}>
    <SidebarHeader>
      <NavUser />
    </SidebarHeader>
    <SidebarContent>
      {navigation.map(navItem => (
        <SidebarNavItem key={navItem.name} {...navItem} />
      ))}
    </SidebarContent>
    <SidebarFooter>
      <Link href="https://github.com/Diliradon" target="_blank">
        Git Hub
      </Link>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
);
