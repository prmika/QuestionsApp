import i18n, { loadResources } from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from '../public/locales/en.json';
import translationFI from '../public/locales/fi.json';

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
        en: {
          translation: translationEN,
        },
        fi: {
          translation: translationFI,
        },
      },
    fallbackLng: "fi", // Use 'fi' if detected lng is unavailable
    debug: true, // Set to false in production
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    
  });

export default i18n;
