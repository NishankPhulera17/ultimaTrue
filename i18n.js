import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './er.json';
import arTranslation from './ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'ar', // Fallback language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
