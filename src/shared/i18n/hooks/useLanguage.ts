import { useTranslation } from 'react-i18next';

import { SupportedLanguage, supportedLanguages } from '..';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as SupportedLanguage;

  const changeLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  const isLanguageSupported = (lang: string): lang is SupportedLanguage => {
    return supportedLanguages.includes(lang as SupportedLanguage);
  };

  return {
    currentLanguage,
    changeLanguage,
    isLanguageSupported,
    supportedLanguages,
  };
};

export default useLanguage;
