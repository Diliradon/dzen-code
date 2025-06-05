'use client';

import { ReactNode, useEffect } from 'react';

import '../i18n'; // Initialize i18n

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  useEffect(() => {
    // Additional client-side i18n initialization can be done here
  }, []);

  return children;
};

export default I18nProvider;
