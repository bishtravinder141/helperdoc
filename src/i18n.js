import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./translations/translations.en.json";
import zhTranslation from "./translations/translations.zh.json";

i18n.use(initReactI18next).init({
  resources: {
    en: enTranslation,
    zh: zhTranslation,
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
