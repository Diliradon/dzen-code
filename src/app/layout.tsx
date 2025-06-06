import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import { cn } from 'shared/lib';
import { I18nProvider, TanStackQueryProvider } from 'shared/providers';
import { Toaster } from 'shared/ui';

import 'app/styles/global.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Dzen Code | Next.js Template',
  description: 'This Next.js template provides Dzen Code examples',
};

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-white text-gray-600 transition-all duration-1000 ease-in-out dark:bg-gray-600 dark:text-white',
          urbanist.className,
        )}
      >
        <I18nProvider>
          <TanStackQueryProvider>
            {children}
            <Toaster />
          </TanStackQueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
