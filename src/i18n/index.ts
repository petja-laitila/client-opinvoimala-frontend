import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { registerLocale, setDefaultLocale } from 'react-datepicker';

import fns_fi from 'date-fns/locale/fi';
import fi from './locales/fi.json';

// Set locale for date pickers
registerLocale('fi', fns_fi);
setDefaultLocale('fi');

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
