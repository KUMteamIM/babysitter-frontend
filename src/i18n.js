import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  returnObjects: true,
  lng: "de",
  debug: window.location.host.includes("localhost"),
  resources: {
    de: {
      translation: {
        date: 'Datum',
        time: 'Zeit',
        date_time: 'Datum & Zeit',
        kids: 'Kinder',
        duration: 'Länge',
        pay_rate: '€/h',
        contact: 'Kontakt',
        address: 'Adressdaten',
        total_pay: 'Bezahlung',
        status: 'Status',
        job_requests: 'Buchungsanfragen',
        job_request: 'Buchungsanfrage',
        requests: 'Anfragen',
        accept: 'Annehmen',
        decline: 'Ablehnen',
        cancel: 'Stornieren',
        edit: 'Bearbeiten',
        edit_job: 'Gesuch bearbeiten',
        jobs: {
          available: 'Verfügbar',
          booked: 'Gebucht',
          canceled: 'Storniert',
          invisble: 'Unsichtbar',
          complete: 'Beendet',
          draft: 'Entwurf'
        },
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
        favorites: 'Favoriten',
        sign_out: 'Abmelden',
        signed_in_as: 'Angemeldet als',
        listings: 'Gesuche',
        listing: 'Gesuch',
        offerer: 'Anbieter',
        bookings: 'Buchungen',
        home: 'Start',
        view_all: 'Alle ansehen',
        email: 'E-Mail',
        password: 'Passwort',
        create_new: 'Anlegen',
        sign_up: {
          header: 'Neuregistrierung',
        },
        my_listings: 'Meine Gesuche',
        offers: 'Angebote',
        create_job: 'Neues Gesuch aufgeben',
        description: 'Beschreibung',
        time: 'Zeit',
        times: 'Zeiten',
        location: 'Standort',
        sign_in: 'Anmelden',
        start_time: 'Start',
        end_time: 'Ende',
        name: 'Name',
        offered_by: 'Anbieter',
        ok: 'OK',
        set_filters: 'Filtern',
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
        }
      },
    },
  },
});

export default i18n;
