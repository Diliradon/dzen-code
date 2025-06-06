import { FC } from 'react';

import Link from 'next/link';

type Props = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

export const SidebarNavItem: FC<Props> = ({ name, href, icon }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 hover:bg-gray-100 hover:text-gray-900"
    >
      {icon}
      {name}
    </Link>
  );
};
