import { useTranslation as useReactI18nextTranslation } from 'react-i18next';

import { defaultNS } from '..';

export const useTranslation = (ns: string = defaultNS) => {
  return useReactI18nextTranslation(ns);
};

export default useTranslation;
