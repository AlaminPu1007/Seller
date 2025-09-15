import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// for english
import commonEn from './locales/en/common.json';
import authEn from './locales/en/auth.json';

// for bengali
import commonBn from './locales/bn/common.json';

const resources = {
  en: {
    common: commonEn,
    auth: authEn
  },
  bn: {
    common: commonBn
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'auth'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
