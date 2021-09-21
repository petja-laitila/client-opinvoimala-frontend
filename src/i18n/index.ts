import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fi from './locales/fi.json';

export const languages = [{ name: 'Finnish', value: 'fi' }];

i18n.use(initReactI18next).init({
  fallbackLng: languages[0].value,
  lng: 'fi',

  ns: ['translation'],
  defaultNS: 'translation',

  debug: false,

  resources: {
    fi: { translation: fi },
  },
});

export default i18n;
