'use client';

import { useMemo } from 'react';

import { ChevronsUpDown, LogOut } from 'lucide-react';

import { useAuth } from 'shared/lib';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'shared/ui';

export const NavUser = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const avatar = useMemo(() => {
    return (
      <>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src="/avatar.jpg" alt={user?.name || ''} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user?.name || ''}</span>
          <span className="truncate text-xs">{user?.email || ''}</span>
        </div>
      </>
    );
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-2 p-2">
          {avatar}
          <ChevronsUpDown className="ml-auto size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            {avatar}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
