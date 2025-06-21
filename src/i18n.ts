import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  // load translation using http -> see /public/locales
  .use(HttpApi)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    supportedLngs: ['en', 'vi'],
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n; 