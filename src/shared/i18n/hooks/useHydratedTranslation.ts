import { useEffect, useState } from 'react';

import { useTranslation as useReactI18nextTranslation } from 'react-i18next';

import { defaultNS } from '..';

/**
 * Hook that ensures translations are only rendered after hydration
 * to prevent hydration mismatches. Use this instead of useTranslation
 * in components that might render different content based on translations.
 */
export const useHydratedTranslation = (ns: string = defaultNS) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const translation = useReactI18nextTranslation(ns);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    ...translation,
    isHydrated,
    // Return a safe t function that returns keys if not hydrated
    t: isHydrated ? translation.t : (key: string) => key,
  };
};

export default useHydratedTranslation;
