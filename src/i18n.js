import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  returnObjects: true,
  lng: "de",
  debug: window.location.host.includes("localhost"),
  resources: {
    de: {
      translation: {
        accept: 'Annehmen',
        address: 'Adressdaten',
        bookings: 'Buchungen',
        cancel: 'Stornieren',
        contact: 'Kontakt',
        create_new: 'Anlegen',
        create_job: 'Neues Gesuch aufgeben',
        date: 'Datum',
        date_time: 'Datum & Zeit',
        dates: {
          abbr_day_names: [
            "So",
            "Mo",
            "Di",
            "Mi",
            "Do",
            "Fr",
            "Sa"
          ],
          abbr_month_names: [
            null,
            "Jan",
            "Feb",
            "Mär",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Okt",
            "Nov",
            "Dez"
          ],
          day_names: [
            "Sonntag",
            "Montag",
            "Dienstag",
            "Mittwoch",
            "Donnerstag",
            "Freitag",
            "Samstag"
          ],
          formats: {
            default: "%d.%m.%Y",
            long: "%e. %B %Y",
            short: "%e. %b"
          },
          month_names: [
            null,
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember"
          ],
          order: [":day",
            ":month",
            ":year"
          ]
        },
        decline: 'Ablehnen',
        description: 'Beschreibung',
        duration: 'Länge',
        edit: 'Bearbeiten',
        edit_job: 'Gesuch bearbeiten',
        email: 'E-Mail',
        end_time: 'Ende',
        favorites: 'Favoriten',
        home: 'Start',
        job_filters: {
          this_week: 'Diese Woche',
          next_two_weeks: 'Nächste 2 Wochen',
          this_month: 'Dieser Monat',
          half_year: 'Nächstes halbes Jahr',
          this_year: 'Dieses Jahr',
          period: 'Zeitraum',
          all: 'Alle',
          between: 'Zwischen',
          and: ' und '
        },
        job_status: 'Status',
        job_requests: 'Buchungsanfragen',
        job_request: 'Buchungsanfrage',
        jobs: {
          available: 'Verfügbar',
          booked: 'Gebucht',
          canceled: 'Storniert',
          invisble: 'Unsichtbar',
          complete: 'Beendet',
          draft: 'Entwurf'
        },
        kids: 'Kinder',
        listings: 'Gesuche',
        listing: 'Gesuch',
        location: 'Standort',
        login: {
          forgot_password: 'Passwort Vergessen',
          introduction_text: 'Um fortzufahren geben Sie bitte E-Mail-Adresse und Passwort ein.',
          login: 'Anmelden',
          login_noun: 'Anmeldung',
          logout: 'Abmelden',
          member_area: 'Mitgliederbereich',
          standard_error: 'Einige Ihrer Angaben sind fehlerhaft.',
          sign_up_action: 'Neuregistrierung.',
          sign_up_desc: 'Sie haben noch kein Konto und möchten am Netzwerk teilnehmen? Dann hier entlang zur'
        },
        my_listings: 'Meine Gesuche',
        name: 'Name',
        next_bookings: 'Anstehende Buchungen',
        offered_by: 'Anbieter',
        offerer: 'Anbieter',
        offers: 'Angebote',
        ok: 'OK',
        password: 'Passwort',
        pay_rate: '€/h',
        ratings: 'Eindrücke',
        requests: 'Anfragen',
        total_pay: 'Bezahlung',
        time: 'Zeit',
        sign_out: 'Abmelden',
        signed_in_as: 'Angemeldet als',
        sign_up: {
          header: 'Neuregistrierung',
        },
        status: 'Status',
        time: 'Zeit',
        times: 'Zeiten',
        sign_in: 'Anmelden',
        start_time: 'Start',
        view_all: 'Alle ansehen',
        view_profile: 'Profil ansehen',
        set_filters: 'Filtern'
      },
    },
  },
});

export default i18n;
