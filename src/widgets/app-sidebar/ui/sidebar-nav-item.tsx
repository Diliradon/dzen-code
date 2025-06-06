import { FC } from 'react';

import Link from 'next/link';

type Props = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

export const SidebarNavItem: FC<Props> = ({ name, href, icon }) => {
  return (
    <Link href={href} className="flex items-center gap-4 p-4">
      {icon}
      {name}
    </Link>
  );
};
