import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCryptoTable from "./locales/en/cryptoTable.json";
import enHeader from "./locales/en/header.json";
import enTokenChart from "./locales/en/tokenChart.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: false,
    resources: {
      en: {
        translation: enCryptoTable,  
        header: enHeader,           
        tokenChart: enTokenChart,   
      },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
