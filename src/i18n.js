import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  returnObjects: true,
  lng: "de",
  debug: window.location.host.includes("localhost"),
  resources: {
    de: {
      translation: {
        booked_jobs: 'Buchungen',
        requested_jobs: 'Buchungsanfragen',
        all_jobs: 'Gesuche',
        favorites: 'Favoriten',
        sign_out: 'Abmelden'
      },
    },
  },
});

export default i18n;
