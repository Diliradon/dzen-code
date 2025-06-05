'use client';

import { SupportedLanguage } from 'shared/i18n';
import { useLanguage, useTranslation } from 'shared/i18n/hooks';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  uk: 'Українська',
};

const languageFlags: Record<SupportedLanguage, string> = {
  en: '🇺🇸',
  uk: '🇺🇦',
};

export const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, supportedLanguages } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang as SupportedLanguage);
  };

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-fit" aria-label={t('language')}>
        <SelectValue>
          <div className="flex items-center gap-2">
            <span>{languageFlags[currentLanguage]}</span>
            <span>{languageNames[currentLanguage]}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {supportedLanguages.map(lang => (
          <SelectItem key={lang} value={lang}>
            <div className="flex items-center gap-3">
              <span>{languageFlags[lang]}</span>
              <span>{languageNames[lang]}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
