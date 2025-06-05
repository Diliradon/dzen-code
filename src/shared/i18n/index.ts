import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en.json';
import ukTranslations from './locales/uk.json';

export const defaultNS = 'common';
export const fallbackLng = 'en';
export const supportedLanguages = ['en', 'uk'] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

const resources = {
  en: {
    common: enTranslations,
  },
  uk: {
    common: ukTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,
    defaultNS,
    ns: ['common'],

    // Language detection options
    detection: {
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    react: {
      useSuspense: false, // Disable suspense mode for SSR compatibility
    },

    // Always start with fallback language to prevent hydration mismatch
    // Language detection will happen after hydration on the client
    lng: fallbackLng,

    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;
