'use client';

import { ReactNode, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { supportedLanguages } from '../i18n';

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const { i18n } = useTranslation();
  const [isLanguageDetected, setIsLanguageDetected] = useState(false);

  useEffect(() => {
    // Detect and set the language after hydration to prevent mismatch
    const detectLanguage = async () => {
      // Only detect language on client side after hydration
      if (typeof window !== 'undefined' && !isLanguageDetected) {
        const detectedLang = i18n.services.languageDetector?.detect();

        if (detectedLang && typeof detectedLang === 'string') {
          // Check if detected language is supported
          const langToUse = supportedLanguages.includes(detectedLang as any)
            ? detectedLang
            : detectedLang.split('-')[0]; // Handle cases like 'en-US'

          if (
            supportedLanguages.includes(langToUse as any) &&
            langToUse !== i18n.language
          ) {
            await i18n.changeLanguage(langToUse);
          }
        }

        setIsLanguageDetected(true);
      }
    };

    detectLanguage();
  }, [i18n, isLanguageDetected]);

  return children;
};

export default I18nProvider;
