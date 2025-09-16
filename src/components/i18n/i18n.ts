import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCryptoTable from "./locales/en/cryptoTable.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: false,
    resources: {
      en: { translation: enCryptoTable },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
