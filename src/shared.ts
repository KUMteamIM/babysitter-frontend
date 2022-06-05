import {
  faClipboardCheck,
  faClipboardQuestion,
  faGhost,
  faHistory, faPencil,
  faPersonCircleQuestion,
  faSearch,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { getI18n } from "react-i18next";
import * as Yup from "yup";
import { GeoCode, Job, JobDetails, Location, User } from "./interfaces";

/**
 * @param {string} geocode | comma-seperated latitude and longitude
 * @returns Object with lat and lng for geo_coding
 */
export const latlngforMap = (geo_code: string):GeoCode => {
  const geo_coords: Array<string> = geo_code.split(",");
  const lat = parseFloat(geo_coords[0]);
  const lng = parseFloat(geo_coords[1]);
  return { lat: lat, lng: lng };
};

/**
 * Returns the localized short day name from index, i.e. 0 = Mon
 * @param {number} index
 * @returns translated day name
 */
export const getDayByIndex = (index: number):string => {
  return getI18n().t("dates.abbr_day_names")[index];
};
/**
 * Returns the localized month name from index, i.e. 1 = Jan
 * @param {number} index
 * @returns translated month name
 */
export const getMonthByIndex = (index: number):string => {
  return getI18n().t("dates.month_names")[index];
};

/**
 * Return formatted name string
 * @param {object}
 * @returns string with last name and first name, i.e. Smith, John
 */
export const getDisplayName = (user: User|undefined|null):string => {
  if(!user) return ''
  const { title, first_name, last_name } = user
  return `${title || ''} ${first_name || ''} ${last_name}`;
};

/**
 * calculate duration between 2 dates in full hours
 * @param {date} start
 * @param {date} end
 * @returns number
 */
export function durationInMs(start:Date, end:Date):number {
  return end.getTime() - start.getTime();
}

/**
 * set a cookie
 * @param {string} name
 * @param {string} value
 * @param {number} days
 */
export function setCookie(name: string, value: string, days:number = 0) {
  var expires: string = "";
  if (days) {
    var date: Date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * get a cookie value
 * @param {string} name
 * @returns value or null
 */
export function getCookie(name:string):string|null {
  var nameEQ: string = name + "=";
  var ca: Array<string> = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c: string = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

var yesterday: Date = new Date();
yesterday.setDate(yesterday.getDate() - 1);

/**
 *
 * @param {string} url
 * @returns url without https or http
 */
export function slimURL(url:string):string {
  return url.replace(/(^\w+:|^)\/\//, '');
}

const pwreg = /[*@!#%&()^~{}?]+/
/**
 * @param t i18n translation object
 * @returns validation schema
 */
export const passwordValidationSchema = (t:any):any => Yup.object().shape({
  default_password: Yup.string().required(
    t("validation.field_required", { field: t("passwords.default_password") })
  ),
  password: Yup.string().required(
    t("validation.field_required", { field: t("passwords.password") })
  ).min(8, t("passwords.password") + t("passwords.password_length")).matches(pwreg, t("passwords.password") + t("passwords.password_requirements")),
  password_confirmation: Yup.string().required(
    t("validation.field_required", {
      field: t("passwords.password_confirmation"),
    })
  ).oneOf([Yup.ref("password"), null], t("passwords.must_match")),
});

export const getJobDetails = (job:Job):JobDetails => {
  const endDate = typeof job.end_time === 'string' ? new Date( job.end_time) :  job.end_time
  const startDate = typeof job.start_time === 'string' ? new Date( job.start_time) :  job.start_time

  const milliseconds = durationInMs(startDate, endDate)
  const hours = Math.floor(milliseconds / 1000 / 60 / 60)
  const minutes = new Date(milliseconds - (hours * 60 * 60 * 1000)).getMinutes()
  const total_kids: number = job.infant_count + job.toddler_count + job.school_age_count
  const total_pay = Math.ceil((hours + (minutes/60)) * job.pay_rate)

  return { end_time: endDate, start_time: startDate, hours, minutes, milliseconds, total_kids, total_pay, pay_rate: job.pay_rate }
}

const defaultDateOptions = {
  day: "numeric",
  month: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

/**
 * Formats date into locale-specific string with either day, month, hour, minute
 * or any other options passed
 * @param {date} date
 * @param {options} DateOptions
 */
export const displayDate = (date: Date, options: any = defaultDateOptions) => {
  try {
    return new Intl.DateTimeFormat(
      navigator.language,
      options
    ).format(date);
  } catch (e:any) {
    return e.message;
  }
};

/**
 * Formats date into locale-specific string with month and year
 * @param {date} date
 */
export const displayDateMonthYear = (date: Date) => {
  return displayDate(date, { month: "numeric", year: "numeric" });
};

/**
 * Display day and month
 * @param {date} date
 */
export const displayDateDayMonth = (date: Date) => {
  return displayDate(date, { month: "numeric", day: "numeric", year: "numeric" });
};
/**
 * Display hour and minute
 * @param {date} date
 */
export const displayHourMinute = (date: Date) => {
  return displayDate(date, { hour: "numeric", minute: "numeric" });
};

/**
 * Calculate distance between two points
 * @param pointA GeoCode
 * @param pointB GeoCode
 * @returns distance in meters
 */
export const caluclateDistance = (pointA:GeoCode, pointB:GeoCode):number => {
  const lat1 = pointA.lat
  const lat2 = pointB.lat
  const lon1 = pointA.lng
  const lon2 = pointB.lng

  const R = 6371e3; // meters
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // in metres
  return d
}

export const iconByStatus: any = {
  booked: faClipboardCheck,
  requested: faClipboardQuestion,
  available: faPersonCircleQuestion,
  complete: faHistory,
  draft: faPencil,
  canceled: faXmark,
  invisble: faGhost
};

export const pathByStatus: any = {
  booked: "/bookings",
  complete: "/bookings",
  available: "/listings",
};


/**
 * Check if d1 is before d2 (exclude equal date)
 * @param {date} d1
 * @param {date} d2
 * @param {boolean} considerTime
 * @returns boolean
 */
 export const before = (d1: Date, d2: Date, considerTime: boolean) => {
  return (
    considerTime ? (d1 < d2) :
      (d1.getFullYear() < d2.getFullYear()) ||
      (d1.getMonth() < d2.getMonth()) ||
      (d1.getDate() < d2.getDate())
  );
};

/**
 * Check if d1 is on or after d2
 * @param {date} d1
 * @param {date} d2
 * @param {boolean} considerTime
 * @returns boolean
 */
export const onOrAfter = (d1: Date, d2: Date, considerTime: boolean) => {
  return (
    !before(d1, d2, considerTime)
  );
};

/**
 * Check if two dates are on the same day
 * @param {date} d1
 * @param {date} d2
 * @returns boolean
 */
export const sameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

/**
 * checks if a date is in the past, not considering hours
 * @param {Date} date
 * @returns boolean
 */
export function isPast(date: Date): boolean {
  let now = new Date();
  now.setHours(0, 0, 0, 0)
  return date.getTime() < now.getTime()
}

export function numericOptions(starts: number = 0, ends: number = 7): Array<number> {
  let elements = []
  for (let index = starts; index <= ends; index++) {
    elements.push(index)
  }
  return elements
}

export const compareAndCall = (currentObj:object, nextObj:object, stateUpdater: Function): void => {
  if (JSON.stringify(currentObj) !== JSON.stringify(nextObj)) {
    stateUpdater(nextObj)
  }
}

export const selectMinutes: Array<number> = new Array(
  Math.round(60 / 5)
).fill(1).map((value, index) => index * 5);

export const getUserLocation = (user:User, locationId: number):Location|undefined => {
  let loco: Location|undefined = user.locations.find(({id}) => id === locationId)
  return loco
}